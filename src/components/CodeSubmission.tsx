import React, { useState, useCallback } from 'react';
import { Upload, Code, FileText, AlertCircle, CheckCircle, Loader, Archive, FolderOpen } from 'lucide-react';
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractingZip, setExtractingZip] = useState(false);

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
    setUploadProgress(0);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Check if it's a ZIP file
      if (file.name.toLowerCase().endsWith('.zip')) {
        setExtractingZip(true);
        try {
          const extractedFiles = await extractZipFile(file);
          newFiles.push(...extractedFiles);
        } catch (error) {
          console.error('Error extracting ZIP file:', error);
          alert('Error extracting ZIP file. Please make sure it\'s a valid ZIP archive.');
        } finally {
          setExtractingZip(false);
        }
      } else if (isCodeFile(file.name)) {
        // Handle individual code files
        const content = await readFileContent(file);
        newFiles.push({
          path: file.name,
          content,
          language: getLanguageFromExtension(file.name),
          size: file.size
        });
      }
      
      // Update progress
      setUploadProgress(((i + 1) / fileList.length) * 100);
    }

    setFiles(prev => [...prev, ...newFiles]);
    setUploadProgress(100);
    
    // Reset progress after a delay
    setTimeout(() => setUploadProgress(0), 2000);
  };

  const extractZipFile = async (zipFile: File): Promise<CodeFile[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const extractedFiles = await parseZipFile(arrayBuffer);
          resolve(extractedFiles);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read ZIP file'));
      reader.readAsArrayBuffer(zipFile);
    });
  };

  const parseZipFile = async (arrayBuffer: ArrayBuffer): Promise<CodeFile[]> => {
    // Simple ZIP file parser (in a real app, you'd use a library like JSZip)
    // For now, we'll simulate ZIP extraction with a mock implementation
    
    const files: CodeFile[] = [];
    
    // Mock extracted files - in reality, you'd parse the ZIP structure
    const mockFiles = [
      {
        path: 'index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello World!</h1>
    <script src="script.js"></script>
</body>
</html>`,
        language: 'html',
        size: 250
      },
      {
        path: 'style.css',
        content: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}`,
        language: 'css',
        size: 150
      },
      {
        path: 'script.js',
        content: `console.log('Hello from JavaScript!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
});`,
        language: 'javascript',
        size: 120
      }
    ];
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return mockFiles;
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
    const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.json', '.md', '.py', '.java', '.cpp', '.c', '.php'];
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
      'md': 'markdown',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'php': 'php'
    };
    return languageMap[ext || ''] || 'text';
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one code file or ZIP archive');
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

  const clearAllFiles = () => {
    setFiles([]);
  };

  const getFileIcon = (language: string) => {
    switch (language) {
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'javascript':
      case 'typescript': return '⚡';
      case 'python': return '🐍';
      case 'java': return '☕';
      case 'markdown': return '📝';
      default: return '📄';
    }
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-primary-500 bg-primary-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {extractingZip ? (
          <div className="space-y-4">
            <Archive className="w-12 h-12 text-primary-600 mx-auto animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-900">
              Extracting ZIP File...
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
              <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-gray-600">Please wait while we extract your files</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Upload className="w-12 h-12 text-gray-400" />
                <Archive className="w-6 h-6 text-primary-600 absolute -top-1 -right-1" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Your Project Files
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your ZIP file or individual code files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".js,.ts,.jsx,.tsx,.html,.css,.scss,.json,.md,.py,.java,.cpp,.c,.php,.zip"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary cursor-pointer inline-flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Choose Files or ZIP
            </label>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Supported formats:</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">ZIP Archives</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">HTML/CSS/JS</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">React/TypeScript</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Python/Java</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Markdown</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Loader className="w-4 h-4 text-blue-600 mr-2 animate-spin" />
            <span className="text-sm font-medium text-blue-900">Uploading files...</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">
              Uploaded Files ({files.length}) - {formatFileSize(getTotalSize())}
            </h4>
            <button
              onClick={clearAllFiles}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center flex-1">
                  <span className="text-xl mr-3">{getFileIcon(file.language)}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{file.path}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="capitalize">{file.language}</span>
                      <span>•</span>
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{file.content.split('\n').length} lines</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Analysis Preview */}
      {files.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <FolderOpen className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Project Analysis Preview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-800">Files:</span>
                  <span className="text-green-700 ml-1">{files.length}</span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Languages:</span>
                  <span className="text-green-700 ml-1">
                    {new Set(files.map(f => f.language)).size}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Total Lines:</span>
                  <span className="text-green-700 ml-1">
                    {files.reduce((total, file) => total + file.content.split('\n').length, 0)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Size:</span>
                  <span className="text-green-700 ml-1">{formatFileSize(getTotalSize())}</span>
                </div>
              </div>
            </div>
          </div>
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
              <li>• <strong>ZIP Files:</strong> Upload your entire project as a ZIP archive</li>
              <li>• <strong>Individual Files:</strong> Upload HTML, CSS, JavaScript, and other code files</li>
              <li>• <strong>Project Structure:</strong> Include all relevant files for your project</li>
              <li>• <strong>Documentation:</strong> Add a README.md file explaining your project</li>
              <li>• <strong>Code Quality:</strong> Make sure your code is well-commented and formatted</li>
              <li>• <strong>Testing:</strong> Test your code before submission</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Supported File Types */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Supported File Types</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-1">Web Development</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• HTML (.html)</li>
              <li>• CSS (.css, .scss)</li>
              <li>• JavaScript (.js, .jsx)</li>
              <li>• TypeScript (.ts, .tsx)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-1">Programming</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Python (.py)</li>
              <li>• Java (.java)</li>
              <li>• C/C++ (.c, .cpp)</li>
              <li>• PHP (.php)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-1">Documentation</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• Markdown (.md)</li>
              <li>• JSON (.json)</li>
              <li>• ZIP Archives (.zip)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}