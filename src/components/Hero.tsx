import Link from 'next/link'
import Image from 'next/image'
import HeroContent from './HeroContent'
import StatusTag from './StatusTag'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-tech-grid bg-gradient-to-br from-background-light via-secondary/20 to-purple-light/10 dark:from-background-dark dark:via-purple-dark/10 dark:to-accent-dark/5"
      aria-label="Introduction"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/" className="inline-block" aria-label="Expression Neuroscience Institute home">
              <Image
                src="/logos/ENI_logo_pink_vector.svg"
                alt="Expression Neuroscience Institute"
                width={140}
                height={56}
                priority
              />
            </Link>
            <span className="eyebrow">{'// nonprofit · neurodivergent-led'}</span>
          </div>

          <HeroContent />
        </div>

        {/* Pillars row */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="panel p-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
              [01] Open by default
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-light dark:text-text-dark">
              Every file, every dataset, every fail
            </h3>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
              CAD, firmware, code, lab notes — all published under permissive
              licenses. If we figured it out, you can too.
            </p>
          </div>

          <div className="panel p-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
              [02] Gen Z, neurodivergent
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-light dark:text-text-dark">
              Built by the brains we&apos;re studying
            </h3>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
              ADHD, OCD, autism, anxiety. We&apos;re researching the conditions
              we live with — and we&apos;re doing it on our own terms.
            </p>
          </div>

          <div className="panel p-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
              [03] Demystify the science
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-light dark:text-text-dark">
              Document the process, not just the win
            </h3>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
              Public papers are filtered. Our build logs aren&apos;t. Follow the
              wires, the dead ends, the breakthroughs.
            </p>
          </div>
        </div>

        {/* Current focus card */}
        <div className="mt-16 panel p-8 md:p-10 relative">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="tape">CURRENT FOCUS · UNFUNDED</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-light dark:text-muted-dark">
              programs/microneedle-eeg
            </span>
            <StatusTag status="early-research" size="small" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-3">
            Designing an open, comfortable EEG with{' '}
            <span className="gradient-text">microneedle arrays</span>
          </h2>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed max-w-3xl mb-6">
            Conventional EEG means gel, scrubbing, and a technician. We&apos;re
            sketching out what it would take to replace that with a comfortable
            array of microscopic dry electrodes — and publishing every step.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programs/microneedle-eeg"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-accent-light dark:bg-accent-dark text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Read the brief
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] border border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              See the roadmap
            </Link>
          </div>
        </div>

        {/* Manifesto strip */}
        <div className="mt-12 grid md:grid-cols-4 gap-4 text-sm font-mono">
          {[
            'we hate hype',
            'we love primary sources',
            'we explain like you matter',
            'we will not gatekeep',
          ].map((line) => (
            <div
              key={line}
              className="px-4 py-3 rounded-lg border border-purple-300/40 dark:border-purple-500/30 bg-white/40 dark:bg-surface-dark/30 text-text-light dark:text-text-dark uppercase tracking-[0.15em] text-center"
            >
              &gt; {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
