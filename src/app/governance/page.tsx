import Link from 'next/link'
import { footerConfig } from '@/app/data/documentConfig'
import Navbar from '@/components/Navbar'
export const metadata = {
  title: 'Governance | Expression Neuroscience Institute',
  description: 'Governance documents and resources for the Expression Neuroscience Institute',
}

export default function GovernancePage() {
  // Group documents into categories
  const documents = footerConfig.documentLinks
  const bylaws = documents.filter(doc => doc.text.toLowerCase().includes('bylaw'))
  const policies = documents.filter(doc => doc.text.toLowerCase().includes('policy'))
  const minutes = documents.filter(doc => doc.text.toLowerCase().includes('minutes'))
  const others = documents.filter(doc => 
    !doc.text.toLowerCase().includes('bylaw') && 
    !doc.text.toLowerCase().includes('policy') && 
    !doc.text.toLowerCase().includes('minutes')
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Governance Documents</h1>
        
      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-2xl font-semibold">Legal Documents</h2>
          </div>
          <ul className="space-y-3">
            <li className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
              <Link 
                href="/governance/terms-of-service"
                className="flex items-center text-accent-light dark:text-accent-dark hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Terms of Service
              </Link>
            </li>
            <li className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
              <Link 
                href="/governance/privacy-policy"
                className="flex items-center text-accent-light dark:text-accent-dark hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </section>

        {bylaws.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold">Bylaws</h2>
              <Link 
                href="/governance/bylaws" 
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
              >
                View all bylaws →
              </Link>
            </div>
            <ul className="space-y-3">
              {bylaws.slice(0, 3).map((doc, index) => (
                <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
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
              {bylaws.length > 3 && (
                <li className="text-center text-sm text-gray-500 mt-2">
                  <Link href="/governance/bylaws" className="hover:underline">
                    + {bylaws.length - 3} more bylaws
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}

        {policies.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold">Policies</h2>
              <Link 
                href="/governance/policies" 
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
              >
                View all policies →
              </Link>
            </div>
            <ul className="space-y-3">
              {policies.slice(0, 3).map((doc, index) => (
                <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
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
              {policies.length > 3 && (
                <li className="text-center text-sm text-gray-500 mt-2">
                  <Link href="/governance/policies" className="hover:underline">
                    + {policies.length - 3} more policies
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}

        {minutes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold">Meeting Minutes</h2>
              <Link 
                href="/governance/meeting-minutes" 
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
              >
                View all minutes →
              </Link>
            </div>
            <ul className="space-y-3">
              {minutes.slice(0, 3).map((doc, index) => (
                <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
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
              {minutes.length > 3 && (
                <li className="text-center text-sm text-gray-500 mt-2">
                  <Link href="/governance/meeting-minutes" className="hover:underline">
                    + {minutes.length - 3} more minutes
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}

        {others.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-2xl font-semibold">Other Documents</h2>
              <Link 
                href="/governance/other-documents" 
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
              >
                View all documents →
              </Link>
            </div>
            <ul className="space-y-3">
              {others.slice(0, 3).map((doc, index) => (
                <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors">
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
              {others.length > 3 && (
                <li className="text-center text-sm text-gray-500 mt-2">
                  <Link href="/governance/other-documents" className="hover:underline">
                    + {others.length - 3} more documents
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
      </div>
    </div>
  )
} 