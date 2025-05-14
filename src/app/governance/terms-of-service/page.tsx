'use client'

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-left">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4"><strong>Last Updated:</strong> April 14, 2025</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Using Our Site</h2>
      <p className="mb-4">
        By using our website, you agree to follow these terms. You agree not to use our site for anything unlawful or harmful. No hacking, impersonation, or spam.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Donations</h2>
      <p className="mb-4">
        Donations are voluntary and generally non-refundable. Payments are handled securely through trusted processors like Donorbox and Stripe.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        All content (text, visuals, logos) on this site belongs to ENI unless otherwise noted. You can share it for educational or nonprofit purposes with credit. No unauthorized commercial use.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. External Links</h2>
      <p className="mb-4">
        We may link to third-party sites for your convenience. We are not responsible for their content or privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. No Guarantees</h2>
      <p className="mb-4">
        We do our best to keep the site accurate and accessible, but make no guarantees. Use the site at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Updates</h2>
      <p className="mb-4">
        These terms may change. Continued use of our site means you accept the current version.
      </p>
      
      <div className="mt-8">
        <button 
          onClick={() => window.history.back()} 
          className="text-accent-light dark:text-accent-dark hover:underline cursor-pointer flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>
    </main>
  );
} 