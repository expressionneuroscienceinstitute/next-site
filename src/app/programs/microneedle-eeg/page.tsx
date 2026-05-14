import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StatusTag from '@/components/StatusTag'

export default function MicroneedleEegProgram() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main
        id="main-content"
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        tabIndex={-1}
      >
        <nav className="mb-8" aria-label="Breadcrumb navigation">
          <Link
            href="/programs"
            className="inline-flex items-center text-sm font-mono uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark rounded"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to programs
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="eyebrow">{'// current focus'}</span>
            <StatusTag status="early-research" size="medium" />
            <span className="tape">UNFUNDED · BUILDING IN PUBLIC</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight">
            Microneedle Array <span className="gradient-text">EEG</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-light dark:text-muted-dark max-w-3xl leading-relaxed">
            We are designing — out loud, in public — a comfortable, low-impedance,
            gel-free EEG headset built around microneedle arrays. No surgery, no
            messy goop, no proprietary black boxes. Every CAD file, every dataset,
            every dead-end belongs to everyone.
          </p>
        </header>

        <section
          className="panel p-8 mb-10"
          aria-labelledby="why-heading"
        >
          <h2 id="why-heading" className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
            Why microneedles? <span className="caret" aria-hidden="true" />
          </h2>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-4">
            Traditional research-grade EEG needs conductive gel, careful skin prep,
            and a technician. Dry-contact electrodes are convenient but noisy.
            Microneedle arrays sit in between: tiny needles short enough to never
            reach the dermis, just long enough to bypass the dry, insulating outer
            layer of skin (the stratum corneum). The result is lower impedance,
            less prep time, and no needles you can actually feel.
          </p>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed">
            It is an active research area, not a solved problem — and that is
            exactly why we want to document the journey instead of waiting for a
            corporate vendor to ship a closed box.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-10" aria-label="Project principles">
          {[
            {
              title: 'Open by default',
              body: 'Hardware, firmware, signal-processing code, datasets, lab notes — all CC-BY / permissive licensed from day one.',
            },
            {
              title: 'Comfortable for real people',
              body: 'Designed with neurodivergent users in mind: no gel, no scratching, low-sensory headset materials.',
            },
            {
              title: 'Honest about uncertainty',
              body: 'We tag every milestone with its real status: early-research, speculative, in-progress. No hype.',
            },
          ].map((card) => (
            <div key={card.title} className="panel p-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2 font-mono">
                {card.title}
              </h3>
              <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="panel p-8 mb-10" aria-labelledby="log-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="log-heading" className="text-2xl font-bold text-text-light dark:text-text-dark">
              Build log
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark">
              eni://research/μneedle-eeg
            </span>
          </div>
          <ul className="space-y-3" role="list">
            <li className="log-line">
              <span className="log-tag">[concept]</span>
              Identifying microneedle geometries from the published literature that
              balance comfort, impedance, and manufacturability.
            </li>
            <li className="log-line">
              <span className="log-tag">[planned]</span>
              Open-source CAD for a 4-channel prototype headband with swappable
              electrode modules.
            </li>
            <li className="log-line">
              <span className="log-tag">[planned]</span>
              Bench-test impedance vs. wet Ag/AgCl electrodes on a saline phantom.
            </li>
            <li className="log-line">
              <span className="log-tag">[future]</span>
              Move from prototype to a small in-lab pilot, once we have IRB
              oversight and ethical funding lined up.
            </li>
            <li className="log-line">
              <span className="log-tag">[future]</span>
              Public dataset of comfort, signal quality, and wearability
              feedback — collected with explicit, revocable consent.
            </li>
          </ul>
          <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark">
            {'// updates posted to GitHub and our Substack as work happens'}
          </p>
        </section>

        <section className="panel p-8 mb-10" aria-labelledby="learn-heading">
          <h2 id="learn-heading" className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
            Learn alongside us
          </h2>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-6">
            We are not a polished startup. We are a group of Gen-Z, neurodivergent
            researchers and engineers writing down everything we learn so the next
            person doesn&apos;t have to start from scratch. If you want to follow
            along, we publish accessible deep-dives on the science and the
            engineering as we go.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/expressionneuroscienceinstitute"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-accent-light dark:bg-accent-dark text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-opacity"
            >
              Browse the source
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="https://expressionneuroscience.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] border border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Read the lab notes
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] border border-purple-300/60 dark:border-purple-500/40 text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <p className="text-xs font-mono text-muted-light dark:text-muted-dark">
          Disclaimer: This program is unfunded early-stage research. Nothing on
          this page is a medical device, a diagnostic tool, or a product. Hardware
          will not be tested on humans without IRB approval and explicit, informed
          consent.
        </p>
      </main>

      <Footer />
    </div>
  )
}
