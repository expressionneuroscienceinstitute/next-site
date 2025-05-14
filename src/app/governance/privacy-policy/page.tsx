'use client'

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 text-left">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4"><strong>Last Updated:</strong> April 14, 2025</p>

      <p className="mb-4">
        The Expression Neuroscience Institute (&quot;ENI&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your data in compliance with the General Data Protection Regulation (GDPR).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Who We Are</h2>
      <p className="mb-4">
        We are a nonprofit based in California, USA. You can contact us at:<br/>
        <strong>Email:</strong> support@expressionneuroscienceinstitute.org <br/>
        <strong>Address:</strong> available on request
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. What We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Contact info (name, email) when you subscribe or donate</li>
        <li>Payment info (via Donorbox/Stripe)</li>
        <li>Technical data (IP, browser info via analytics)</li>
        <li>Messages or form inputs you send us</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. How We Use Your Info</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To process donations and send receipts</li>
        <li>To send updates if you opt in</li>
        <li>To improve the website and outreach</li>
        <li>To comply with legal/tax obligations</li>
      </ul>

      <p className="mb-4 font-semibold">We do not sell or rent your data. Ever.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Your GDPR Rights</h2>
      <p className="mb-4">
        If you&apos;re in the EU/EEA, you have the right to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Access, correct, or delete your data</li>
        <li>Withdraw consent</li>
        <li>Request data portability</li>
      </ul>
      <p className="mb-4">Email us to exercise your rights.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Sharing</h2>
      <p className="mb-4">
        We only share data with trusted services (Donorbox, Google Analytics, etc.) and only as needed to run our organization. These providers follow GDPR or similar standards.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cookies</h2>
      <p className="mb-4">We use cookies to improve site performance and user experience. You can disable cookies in your browser settings.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Security</h2>
      <p className="mb-4">We use HTTPS and secure third-party platforms to protect your information.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Changes</h2>
      <p className="mb-4">We may update this Privacy Policy. If we do, we&apos;ll update the date above and let you know if it&apos;s a major change.</p>

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