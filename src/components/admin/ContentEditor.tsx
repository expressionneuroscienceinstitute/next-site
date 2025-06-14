'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertCircle, Check, RefreshCw, Eye } from 'lucide-react';

interface ConfigFile {
  id: string;
  name: string;
  path: string;
  description: string;
}

interface ContentEditorProps {
  file: ConfigFile;
  onBack: () => void;
}

export default function ContentEditor({ file, onBack }: ContentEditorProps) {
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingPreview, setIsCreatingPreview] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadContent();
  }, [file.id]);

  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  const loadContent = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/admin/content/${file.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setContent(data.content);
        setOriginalContent(data.content);
      } else {
        setError(data.error || 'Failed to load content');
      }
    } catch (error) {
      setError('Network error loading content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await fetch(`/api/admin/content/${file.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        setOriginalContent(content);
        setSuccessMessage('Content saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.error || 'Failed to save content');
      }
    } catch (error) {
      setError('Network error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = async () => {
    setIsCreatingPreview(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configId: file.id,
          content: content
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Open preview in a new tab
        window.open(data.previewUrl, '_blank');
      } else {
        setError(data.error || 'Failed to create preview');
      }
    } catch (error) {
      setError('Network error creating preview');
    } finally {
      setIsCreatingPreview(false);
    }
  };

  const handleRevert = () => {
    setContent(originalContent);
    setError('');
    setSuccessMessage('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{file.name}</h2>
              <p className="text-sm text-gray-500">{file.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePreview}
              disabled={isCreatingPreview || !content}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingPreview ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {isCreatingPreview ? 'Creating...' : 'Preview'}
            </button>
            {hasChanges && (
              <button
                onClick={handleRevert}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Revert
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mx-6 mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mx-6 mt-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <Check className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content ({file.path})
          </label>
          <div className="relative">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block w-full h-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-xs leading-5"
              placeholder="Enter your content here..."
              style={{ resize: 'vertical', minHeight: '400px' }}
            />
            {hasChanges && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            This editor allows you to modify TypeScript configuration files. 
            Use the Preview button to see how your changes will look on the website before saving.
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {hasChanges ? (
              <span className="text-orange-600 font-medium">Unsaved changes</span>
            ) : (
              <span className="text-green-600">All changes saved</span>
            )}
          </div>
          <div>
            Lines: {content.split('\n').length} | 
            Characters: {content.length}
          </div>
        </div>
      </div>
    </div>
  );
}