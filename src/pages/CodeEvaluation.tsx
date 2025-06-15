import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, BarChart3 } from 'lucide-react';
import CodeSubmissionComponent from '../components/CodeSubmission';
import EvaluationResults from '../components/EvaluationResults';
import ReadinessTracker from '../components/ReadinessTracker';
import { EvaluationResult, ReadinessAssessment } from '../types/evaluation';
import { codeEvaluator } from '../services/codeEvaluator';

export default function CodeEvaluation() {
  const { projectId, milestoneId } = useParams();
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [readinessAssessment, setReadinessAssessment] = useState<ReadinessAssessment | null>(null);
  const [activeTab, setActiveTab] = useState<'submit' | 'results' | 'readiness'>('submit');

  const handleSubmissionComplete = async (result: EvaluationResult) => {
    setEvaluationResult(result);
    setActiveTab('results');

    // Generate readiness assessment
    try {
      const assessment = await codeEvaluator.assessReadiness('current-user', []);
      setReadinessAssessment(assessment);
    } catch (error) {
      console.error('Failed to generate readiness assessment:', error);
    }
  };

  const handleNextStep = () => {
    setActiveTab('readiness');
  };

  const tabs = [
    { id: 'submit', name: 'Submit Code', icon: Upload },
    { id: 'results', name: 'Results', icon: BarChart3, disabled: !evaluationResult },
    { id: 'readiness', name: 'Readiness', icon: BarChart3, disabled: !readinessAssessment }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/projects/${projectId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Evaluation</h1>
          <p className="text-gray-600">
            Submit your code for AI-powered evaluation and personalized feedback
          </p>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
                    disabled={tab.disabled}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : tab.disabled
                        ? 'border-transparent text-gray-400 cursor-not-allowed'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'submit' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Code</h2>
              <CodeSubmissionComponent
                projectId={projectId || ''}
                milestoneId={milestoneId || ''}
                onSubmissionComplete={handleSubmissionComplete}
              />
            </div>
          )}

          {activeTab === 'results' && evaluationResult && (
            <EvaluationResults
              result={evaluationResult}
              onNextStep={handleNextStep}
            />
          )}

          {activeTab === 'readiness' && readinessAssessment && (
            <ReadinessTracker assessment={readinessAssessment} />
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Code Evaluation Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Upload Code</h4>
              <p className="text-sm text-gray-600">
                Upload your project files including HTML, CSS, JavaScript, and documentation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. AI Analysis</h4>
              <p className="text-sm text-gray-600">
                Our AI evaluates code quality, functionality, security, and best practices
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Get Feedback</h4>
              <p className="text-sm text-gray-600">
                Receive detailed feedback, suggestions, and track your job readiness progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}