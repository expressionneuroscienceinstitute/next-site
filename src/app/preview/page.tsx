'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, AlertCircle, ArrowLeft, Edit, Save, X, Check } from 'lucide-react';
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

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

function EditableField({ value, onChange, multiline = false, className = '', placeholder }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className={`cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 rounded px-2 py-1 transition-all ${className}`}
        title="Click to edit"
      >
        {value || placeholder}
      </div>
    );
  }

  if (multiline) {
    return (
      <div className="relative">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`w-full border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          rows={Math.max(3, editValue.split('\n').length)}
          autoFocus
          placeholder={placeholder}
        />
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            <Check className="h-3 w-3 mr-1" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className={`border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        autoFocus
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave();
          } else if (e.key === 'Escape') {
            handleCancel();
          }
        }}
      />
      <div className="flex items-center space-x-2 mt-1">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          <Check className="h-3 w-3 mr-1" />
          Save
        </button>
        <button
          onClick={handleCancel}
          className="inline-flex items-center px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
        >
          <X className="h-3 w-3 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const previewId = searchParams.get('id');
  const isEditMode = searchParams.get('edit') === 'true';
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [editedContent, setEditedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!previewId) {
      setError('No preview ID provided');
      setIsLoading(false);
      return;
    }

    loadPreviewData();
  }, [previewId]);

  useEffect(() => {
    if (previewData && !editedContent) {
      setEditedContent(JSON.parse(JSON.stringify(previewData.content)));
    }
  }, [previewData]);

  useEffect(() => {
    if (editedContent && previewData) {
      setHasUnsavedChanges(JSON.stringify(editedContent) !== JSON.stringify(previewData.content));
    }
  }, [editedContent, previewData]);

  const loadPreviewData = async () => {
    try {
      const response = await fetch(`/api/admin/preview?id=${previewId}`);
      const data = await response.json();

      if (response.ok) {
        setPreviewData(data);
      } else {
        if (response.status === 404) {
          setError('Preview not found or has expired (previews last 30 minutes)');
        } else if (response.status === 410) {
          setError('Preview has expired. Please create a new preview.');
        } else {
          setError(data.error || 'Failed to load preview');
        }
      }
    } catch (error) {
      setError('Network error loading preview. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!previewData || !editedContent) return;

    setIsSaving(true);
    setError('');

    try {
      // Convert edited content back to TypeScript format
      const configName = `${previewData.configId}Config`;
      const tsContent = `export const ${configName} = ${JSON.stringify(editedContent, null, 2)};`;

      const response = await fetch('/api/admin/preview/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configId: previewData.configId,
          content: tsContent,
          saveChanges: true
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setHasUnsavedChanges(false);
        // Update the original preview data
        setPreviewData(prev => prev ? { ...prev, content: editedContent } : null);
      } else {
        setError(data.error || 'Failed to save changes');
      }
    } catch (error) {
      setError('Network error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  const updateEditedContent = (path: string[], value: string) => {
    if (!editedContent) return;

    const newContent = JSON.parse(JSON.stringify(editedContent));
    let current = newContent;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setEditedContent(newContent);
  };

  const getPageTitle = (configId: string) => {
    const baseTitle = {
      'about': 'About Page',
      'roadmap': 'Roadmap',
      'donate': 'Donate Page',
      'research': 'Research Page',
      'documents': 'Document Links'
    }[configId] || 'Content';
    
    return isEditMode ? `${baseTitle} - Edit Mode` : `${baseTitle} Preview`;
  };

  const renderEditableContent = (configId: string, content: any) => {
    if (!content || typeof content !== 'object') {
      return (
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800">
              Preview content is invalid or empty. Please check your configuration syntax.
            </p>
          </div>
        </div>
      );
    }

    const displayContent = isEditMode ? editedContent : content;

    switch (configId) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <EditableField
              value={displayContent.pageTitle || 'About Page'}
              onChange={(value) => updateEditedContent(['pageTitle'], value)}
              className="text-4xl font-bold text-gray-900 mb-8 block w-full"
              placeholder="Page Title"
            />
            
            {/* Mission Section */}
            {displayContent.mission && (
              <section className="mb-12">
                <EditableField
                  value={displayContent.mission.title || 'Mission'}
                  onChange={(value) => updateEditedContent(['mission', 'title'], value)}
                  className="text-2xl font-semibold text-gray-900 mb-4 block w-full"
                  placeholder="Mission Title"
                />
                <EditableField
                  value={displayContent.mission.text || 'Mission text not available'}
                  onChange={(value) => updateEditedContent(['mission', 'text'], value)}
                  multiline
                  className="text-lg text-gray-700 leading-relaxed block w-full"
                  placeholder="Mission description"
                />
              </section>
            )}

            {/* Board Members */}
            {displayContent.board && displayContent.board.members && (
              <section className="mb-12">
                <EditableField
                  value={displayContent.board.title || 'Board Members'}
                  onChange={(value) => updateEditedContent(['board', 'title'], value)}
                  className="text-2xl font-semibold text-gray-900 mb-8 block w-full"
                  placeholder="Board Section Title"
                />
                <div className="grid gap-8 md:grid-cols-2">
                  {displayContent.board.members.map((member: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                      <EditableField
                        value={member.name || 'Name not available'}
                        onChange={(value) => updateEditedContent(['board', 'members', index.toString(), 'name'], value)}
                        className="text-xl font-semibold text-gray-900 mb-2 block w-full"
                        placeholder="Member Name"
                      />
                      <EditableField
                        value={member.role || 'Role not specified'}
                        onChange={(value) => updateEditedContent(['board', 'members', index.toString(), 'role'], value)}
                        className="text-blue-600 font-medium mb-4 block w-full"
                        placeholder="Member Role"
                      />
                      <EditableField
                        value={member.bio || 'Bio not available'}
                        onChange={(value) => updateEditedContent(['board', 'members', index.toString(), 'bio'], value)}
                        multiline
                        className="text-gray-700 leading-relaxed block w-full"
                        placeholder="Member Biography"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Section */}
            {displayContent.future && (
              <section>
                <EditableField
                  value={displayContent.future.title || 'Future'}
                  onChange={(value) => updateEditedContent(['future', 'title'], value)}
                  className="text-2xl font-semibold text-gray-900 mb-4 block w-full"
                  placeholder="Future Section Title"
                />
                <EditableField
                  value={displayContent.future.text || 'Future text not available'}
                  onChange={(value) => updateEditedContent(['future', 'text'], value)}
                  multiline
                  className="text-lg text-gray-700 leading-relaxed block w-full"
                  placeholder="Future description"
                />
              </section>
            )}
          </div>
        );

      case 'donate':
        return (
          <div className="max-w-2xl mx-auto py-8 px-4 text-center">
            <EditableField
              value={displayContent.pageTitle || 'Donate'}
              onChange={(value) => updateEditedContent(['pageTitle'], value)}
              className="text-4xl font-bold text-gray-900 mb-8 block w-full text-center"
              placeholder="Page Title"
            />
            <EditableField
              value={displayContent.paragraph || 'Donation message not available'}
              onChange={(value) => updateEditedContent(['paragraph'], value)}
              multiline
              className="text-lg text-gray-700 leading-relaxed mb-8 block w-full"
              placeholder="Donation message"
            />
            <EditableField
              value={displayContent.buttonText || 'Donate'}
              onChange={(value) => updateEditedContent(['buttonText'], value)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              placeholder="Button Text"
            />
            {displayContent.note && (
              <div className="mt-4">
                <EditableField
                  value={displayContent.note}
                  onChange={(value) => updateEditedContent(['note'], value)}
                  className="text-sm text-gray-500 block w-full text-center"
                  placeholder="Note text"
                />
              </div>
            )}
          </div>
        );

      case 'research':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {displayContent.pageTitle || 'Research'}
            </h1>
            
            {displayContent.datasets && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {displayContent.datasets.title || 'Datasets'}
                </h2>
                <p className="text-gray-600">
                  {displayContent.datasets.emptyMessage || 'No datasets available'}
                </p>
              </section>
            )}

            {displayContent.publications && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {displayContent.publications.title || 'Publications'}
                </h2>
                <p className="text-gray-600">
                  {displayContent.publications.emptyMessage || 'No publications available'}
                </p>
              </section>
            )}
          </div>
        );

      case 'roadmap':
        return (
          <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {displayContent.pageTitle || 'Roadmap'}
            </h1>
            
            {/* Programs */}
            {displayContent.programs && Array.isArray(displayContent.programs) && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Programs</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {displayContent.programs.map((program: any, index: number) => (
                    <div key={program.id || index} className="bg-white p-6 rounded-lg border shadow-sm">
                      <h3 className="font-semibold text-lg mb-2">
                        {program.name || 'Program Name'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {program.description || 'Program description not available'}
                      </p>
                      {program.comingSoon && (
                        <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Company Timeline */}
            {displayContent.company && displayContent.company.timeline && displayContent.company.timeline.milestones && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {displayContent.company.title || 'Timeline'}
                </h2>
                {displayContent.company.description && (
                  <p className="text-gray-700 mb-6">{displayContent.company.description}</p>
                )}
                
                <div className="space-y-4">
                  {displayContent.company.timeline.milestones.map((milestone: any, index: number) => (
                    <div key={milestone.id || index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">
                            {milestone.title || 'Milestone'}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {milestone.date || 'Date TBD'}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          {milestone.description || 'Description not available'}
                        </p>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                          milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {milestone.status ? milestone.status.replace('-', ' ').toUpperCase() : 'UNKNOWN'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        );

      case 'documents':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Document Links Preview</h1>
            {displayContent.documentLinks && Array.isArray(displayContent.documentLinks) ? (
              <div className="grid gap-4 md:grid-cols-2">
                {displayContent.documentLinks.map((link: any, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                    <h3 className="font-semibold mb-2">
                      {link.text || 'Document Link'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {link.isInternal ? 'Internal Link' : 'External Document'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {link.href || 'No URL specified'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No document links available</p>
            )}
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Content Preview</h1>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(displayContent, null, 2)}
              </pre>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
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
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setError('');
                setIsLoading(true);
                loadPreviewData();
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className={`${isEditMode ? 'bg-green-600' : 'bg-blue-600'} text-white py-3 px-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {isEditMode ? <Edit className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
            <span className="font-semibold">
              {isEditMode ? 'Edit Mode' : 'Preview Mode'}
            </span>
            <span className="mx-2">•</span>
            <span className={isEditMode ? 'text-green-100' : 'text-blue-100'}>
              {getPageTitle(previewData?.configId || '')}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isEditMode && hasUnsavedChanges && (
              <span className="text-sm text-yellow-200 font-medium">Unsaved changes</span>
            )}
            {isEditMode && (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving || !hasUnsavedChanges}
                className="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
            <span className="text-sm text-blue-100">
              {isEditMode ? 'Click on text to edit' : 'Changes are not saved'}
            </span>
            <Link 
              href="/admin"
              className={`inline-flex items-center px-3 py-1 ${isEditMode ? 'bg-green-500' : 'bg-blue-500'} text-white rounded hover:${isEditMode ? 'bg-green-400' : 'bg-blue-400'} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white">
        {previewData && renderEditableContent(previewData.configId, previewData.content)}
      </div>

      {/* Edit Mode Instructions */}
      {isEditMode && (
        <div className="bg-green-50 border-t border-green-200 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-green-800">
              <strong>Edit Mode:</strong> Click on any text to edit it inline. Changes are shown in real-time. 
              Click "Save Changes" to make your edits permanent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}