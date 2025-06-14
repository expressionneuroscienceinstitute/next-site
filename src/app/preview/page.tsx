'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import your page components
import { aboutConfig } from '@/app/data/aboutConfig';
import { roadmapConfig } from '@/app/data/roadmapConfig';
import { donateConfig } from '@/app/data/donateConfig';
import { researchConfig } from '@/app/data/researchConfig';
import { footerConfig } from '@/app/data/documentConfig';

interface PreviewData {
  configId: string;
  content: any;
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const previewId = searchParams.get('id');
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!previewId) {
      setError('No preview ID provided');
      setIsLoading(false);
      return;
    }

    loadPreviewData();
  }, [previewId]);

  const loadPreviewData = async () => {
    try {
      const response = await fetch(`/api/admin/preview?id=${previewId}`);
      const data = await response.json();

      if (response.ok) {
        setPreviewData(data);
      } else {
        setError(data.error || 'Failed to load preview');
      }
    } catch (error) {
      setError('Network error loading preview');
    } finally {
      setIsLoading(false);
    }
  };

  const getPageTitle = (configId: string) => {
    switch (configId) {
      case 'about': return 'About Page Preview';
      case 'roadmap': return 'Roadmap Preview';
      case 'donate': return 'Donate Page Preview';
      case 'research': return 'Research Page Preview';
      case 'documents': return 'Document Links Preview';
      default: return 'Content Preview';
    }
  };

  const renderPreviewContent = (configId: string, content: any) => {
    switch (configId) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.pageTitle}</h1>
            
            {/* Mission Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.mission.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{content.mission.text}</p>
            </section>

            {/* Board Members */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">{content.board.title}</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {content.board.members.map((member: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.future.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{content.future.text}</p>
            </section>
          </div>
        );

      case 'donate':
        return (
          <div className="max-w-2xl mx-auto py-8 px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.pageTitle}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{content.paragraph}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {content.buttonText}
            </button>
            {content.note && (
              <p className="text-sm text-gray-500 mt-4">{content.note}</p>
            )}
          </div>
        );

      case 'research':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.pageTitle}</h1>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.datasets.title}</h2>
              <p className="text-gray-600">{content.datasets.emptyMessage}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{content.publications.title}</h2>
              <p className="text-gray-600">{content.publications.emptyMessage}</p>
            </section>
          </div>
        );

      case 'roadmap':
        return (
          <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{content.pageTitle}</h1>
            
            {/* Programs */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Programs</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {content.programs.map((program: any) => (
                  <div key={program.id} className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                    <p className="text-gray-600 text-sm">{program.description}</p>
                    {program.comingSoon && (
                      <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Company Timeline */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{content.company.title}</h2>
              <p className="text-gray-700 mb-6">{content.company.description}</p>
              
              <div className="space-y-4">
                {content.company.timeline.milestones.map((milestone: any) => (
                  <div key={milestone.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <span className="text-sm text-gray-500">{milestone.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{milestone.description}</p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case 'documents':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Document Links Preview</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {content.documentLinks.map((link: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-2">{link.text}</h3>
                  <p className="text-sm text-gray-600">
                    {link.isInternal ? 'Internal Link' : 'External Document'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{link.href}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Content Preview</h1>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">Preview Error</h1>
          </div>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link 
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-blue-600 text-white py-3 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            <span className="font-semibold">Preview Mode</span>
            <span className="mx-2">•</span>
            <span className="text-blue-100">{getPageTitle(previewData?.configId || '')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-100">Changes are not saved</span>
            <Link 
              href="/admin"
              className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white">
        {previewData && renderPreviewContent(previewData.configId, previewData.content)}
      </div>
    </div>
  );
}