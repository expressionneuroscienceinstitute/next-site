import Link from 'next/link'
import Image from 'next/image'
import HeroContent from './HeroContent'
import StatusTag from './StatusTag'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background-light via-secondary/30 to-background-light dark:from-background-dark dark:via-purple-dark/20 dark:to-background-dark"
      aria-label="Introduction"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="inline-block" aria-label="Expression Neuroscience Institute home">
              <Image
                src="/logos/ENI_logo_pink_vector.svg"
                alt="Expression Neuroscience Institute"
                width={132}
                height={52}
                priority
              />
            </Link>
            <p className="kicker">Nonprofit · Gen-Z & neurodivergent-led</p>
          </div>

          <HeroContent />
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'Open by default',
              body: 'CAD, firmware, code, and lab notes under permissive licenses so anyone can build on the work.',
            },
            {
              title: 'Built by people who live it',
              body: 'We research conditions many of us have — ADHD, OCD, autism, anxiety — without pretending we are neutral observers.',
            },
            {
              title: 'Process in public',
              body: 'We write down what we try, what fails, and what we learn so science feels less like a black box.',
            },
          ].map((item) => (
            <div key={item.title} className="panel p-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-light dark:text-muted-dark leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 panel p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-soft">Current focus · not funded yet</span>
            <StatusTag status="early-research" size="small" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-text-light dark:text-text-dark">
            Microneedle-array EEG — open hardware we are designing in public
          </h2>
          <p className="mt-3 text-muted-light dark:text-muted-dark leading-relaxed max-w-2xl">
            We are exploring gel-free, comfortable electrodes and publishing the path as we go. No product claims here — just honest early work.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/programs/microneedle-eeg"
              className="inline-flex items-center justify-center rounded-lg bg-accent-light dark:bg-accent-dark px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Read the project page
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-white/15 px-5 py-2.5 text-sm font-medium text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              Research & notes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
