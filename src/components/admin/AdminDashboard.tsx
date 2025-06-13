'use client';

import { useState, useEffect } from 'react';
import { LogOut, FileText, Edit, Save, X, AlertCircle, Check } from 'lucide-react';
import ContentEditor from './ContentEditor';

interface ConfigFile {
  id: string;
  name: string;
  path: string;
  description: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [files, setFiles] = useState<ConfigFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ConfigFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/admin/content');
      const data = await response.json();
      
      if (response.ok) {
        setFiles(data.files);
      } else {
        setError(data.error || 'Failed to load files');
      }
    } catch (error) {
      setError('Network error loading files');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: ConfigFile) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Content Management System
              </h1>
              <p className="text-sm text-gray-600">
                Manage your website content securely
              </p>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {selectedFile ? (
          <ContentEditor file={selectedFile} onBack={handleBack} />
        ) : (
          <div className="px-4 py-6 sm:px-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {file.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleFileSelect(file)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Content
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {files.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No content files found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No configuration files are available for editing.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}