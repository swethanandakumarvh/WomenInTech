import React, { useState, useCallback } from 'react';
import { Upload, Code, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { CodeSubmission, CodeFile } from '../types/evaluation';
import { codeEvaluator } from '../services/codeEvaluator';

interface CodeSubmissionProps {
  projectId: string;
  milestoneId: string;
  onSubmissionComplete: (result: any) => void;
}

export default function CodeSubmissionComponent({ 
  projectId, 
  milestoneId, 
  onSubmissionComplete 
}: CodeSubmissionProps) {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = async (fileList: FileList) => {
    const newFiles: CodeFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Only accept code files
      if (isCodeFile(file.name)) {
        const content = await readFileContent(file);
        newFiles.push({
          path: file.name,
          content,
          language: getLanguageFromExtension(file.name),
          size: file.size
        });
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const isCodeFile = (filename: string): boolean => {
    const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.json', '.md'];
    return codeExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.toLowerCase().split('.').pop();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'md': 'markdown'
    };
    return languageMap[ext || ''] || 'text';
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one code file');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: CodeSubmission = {
        id: `sub_${Date.now()}`,
        projectId,
        userId: 'current-user', // In real app, get from auth
        milestoneId,
        code: files.map(f => f.content).join('\n\n'),
        files,
        submittedAt: new Date(),
        status: 'evaluating'
      };

      // Evaluate the code
      const result = await codeEvaluator.evaluateCode(submission);
      
      onSubmissionComplete(result);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to evaluate code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Your Code Files
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your code files here, or click to browse
        </p>
        <input
          type="file"
          multiple
          accept=".js,.ts,.jsx,.tsx,.html,.css,.scss,.json,.md"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="btn-primary cursor-pointer inline-flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Choose Files
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Supported: .js, .ts, .jsx, .tsx, .html, .css, .scss, .json, .md
        </p>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Uploaded Files ({files.length})</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Code className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{file.path}</p>
                  <p className="text-sm text-gray-500">
                    {file.language} • {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={files.length === 0 || isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Evaluating Code...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit for Evaluation
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Submission Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload all relevant code files for your project</li>
              <li>• Include HTML, CSS, and JavaScript files</li>
              <li>• Add a README.md file explaining your project</li>
              <li>• Make sure your code is well-commented</li>
              <li>• Test your code before submission</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}