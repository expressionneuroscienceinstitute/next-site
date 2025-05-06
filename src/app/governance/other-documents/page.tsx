import Link from 'next/link'
import { footerConfig } from '@/app/data/documentConfig'

export const metadata = {
  title: 'Other Documents | Expression Neuroscience Institute',
  description: 'Additional governance documents of the Expression Neuroscience Institute',
}

export default function OtherDocumentsPage() {
  const otherDocs = footerConfig.documentLinks.filter(doc => 
    !doc.text.toLowerCase().includes('bylaw') && 
    !doc.text.toLowerCase().includes('policy') && 
    !doc.text.toLowerCase().includes('minutes')
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Other Documents</h1>
      
      {otherDocs.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <ul className="space-y-4">
            {otherDocs.map((doc, index) => (
              <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Link 
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent-light dark:text-accent-dark hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {doc.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No other documents are currently available.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/governance"
          className="inline-flex items-center text-accent-light dark:text-accent-dark hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Governance
        </Link>
      </div>
    </div>
  )
} 