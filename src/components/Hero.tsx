import Link from 'next/link'
import Image from 'next/image'
import HeroContent from './HeroContent'
import StatusTag from './StatusTag'

const pillars = [
  {
    title: 'Open by default',
    body: 'CAD, firmware, code, and lab notes under permissive licenses so anyone can build on the work.',
    stripe: 'border-l-rose-500 dark:border-l-rose-400',
  },
  {
    title: 'Built by people who live it',
    body: 'We research conditions many of us live with (ADHD, OCD, autism, anxiety). We show up as people with a stake in the work.',
    stripe: 'border-l-emerald-600 dark:border-l-emerald-400',
  },
  {
    title: 'Process in public',
    body: 'We write down what we try, what fails, and what we learn so science feels less like a black box.',
    stripe: 'border-l-sky-600 dark:border-l-sky-400',
  },
]

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-hero-shell-light dark:bg-hero-shell-dark"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-rose-400/25 to-transparent blur-3xl dark:from-rose-500/20 motion-safe:animate-float-soft"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-32 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent blur-3xl dark:from-emerald-500/15 motion-safe:animate-float-soft motion-reduce:animate-none"
        style={{ animationDelay: '-4s' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-400/10 blur-2xl dark:bg-purple-500/10"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/" className="inline-block" aria-label="Expression Neuroscience Institute home">
                  <Image
                    src="/logos/ENI_logo_pink_vector.svg"
                    alt="Expression Neuroscience Institute"
                    width={136}
                    height={54}
                    priority
                  />
                </Link>
                <p className="kicker max-w-[16rem] leading-snug">Nonprofit · Gen-Z & neurodivergent-led</p>
              </div>

              <HeroContent />
            </div>
          </div>

          <aside
            className="mt-10 lg:mt-0 lg:col-span-5 flex flex-col justify-center gap-4 rounded-2xl border border-dashed border-rose-200/80 bg-white/50 p-6 text-sm text-muted-light backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-muted-dark lg:min-h-[11rem]"
            aria-label="What we believe"
          >
            <p className="font-display text-lg font-bold leading-snug text-text-light dark:text-text-dark">
              Science shouldn&apos;t feel like a locked room.
            </p>
            <p className="leading-relaxed">
              We publish failed prints, noisy channels, and the questions we still cannot answer. That is how trust gets
              built.
            </p>
          </aside>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <div key={item.title} className={`panel panel-tilt border-l-4 p-6 pl-5 ${item.stripe}`}>
              <h3 className="font-display text-lg font-bold text-text-light dark:text-text-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-light dark:text-muted-dark">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-rose-500/70 via-purple-500/50 to-emerald-500/70 p-[1px] dark:from-rose-500/60 dark:via-purple-500/45 dark:to-emerald-500/55">
          <div className="rounded-2xl bg-white/95 p-6 dark:bg-[#120a18]/95 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="badge-soft">Current focus · not funded yet</span>
              <StatusTag status="early-research" size="small" />
            </div>
            <h2 className="font-display text-2xl font-bold leading-snug text-text-light dark:text-text-dark md:text-3xl">
              Microneedle-array EEG, documented in public
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-light dark:text-muted-dark">
              We are exploring gel-free, comfortable electrodes and writing up what we try as we go. Early research only.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/programs/microneedle-eeg"
                className="inline-flex items-center justify-center rounded-xl bg-accent-light px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-light dark:bg-accent-dark dark:focus:ring-accent-dark"
              >
                Read the project page
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-text-light transition hover:border-accent-light dark:border-white/15 dark:bg-transparent dark:text-text-dark dark:hover:border-accent-dark"
              >
                Research & notes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
