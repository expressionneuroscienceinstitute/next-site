import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { aboutConfig } from '../data/aboutConfig'
import Image from 'next/image'
import {
  TitleSkeleton,
  MissionSkeleton,
  BoardSkeleton,
  FutureSkeleton,
} from '@/components/AboutPageSkeleton'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-tech-grid bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main
        id="main-content"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        tabIndex={-1}
      >
        {aboutConfig?.pageTitle ? (
          <div className="mb-12">
            <span className="eyebrow">{'// about'}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
              {aboutConfig.pageTitle}
            </h1>
          </div>
        ) : (
          <TitleSkeleton />
        )}

        {aboutConfig?.mission?.title && aboutConfig?.mission?.text ? (
          <section className="mb-16 panel p-8 md:p-10">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark mb-3">
              {aboutConfig.mission.title}
            </h2>
            <p className="text-lg md:text-xl text-text-light dark:text-text-dark leading-relaxed">
              {aboutConfig.mission.text}
            </p>
          </section>
        ) : (
          <MissionSkeleton />
        )}

        {aboutConfig?.board?.title && aboutConfig.board.members?.length > 0 ? (
          <section className="mb-16" aria-label="Board members">
            <div className="mb-8">
              <span className="eyebrow">{'// the humans'}</span>
              <h2 className="mt-3 text-3xl font-bold text-text-light dark:text-text-dark">
                {aboutConfig.board.title}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {aboutConfig.board.members.map((member) => (
                <article
                  key={member.name}
                  className="panel p-6 md:p-8 flex flex-col sm:flex-row gap-6"
                >
                  <Image
                    className="rounded-xl border-2 border-accent-light/20 dark:border-accent-dark/20 flex-shrink-0 object-cover w-32 h-32 sm:w-40 sm:h-40"
                    src={member.image}
                    alt={`${member.name} — ${member.role} at Expression Neuroscience Institute`}
                    width={160}
                    height={160}
                  />
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark mt-1">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <BoardSkeleton />
        )}

        {aboutConfig?.future?.title && aboutConfig?.future?.text ? (
          <section className="panel p-10 md:p-12 text-center">
            <span className="eyebrow">{'// invitation'}</span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">
              {aboutConfig.future.title}
            </h2>
            <p className="mt-4 text-lg text-muted-light dark:text-muted-dark max-w-3xl mx-auto leading-relaxed">
              {aboutConfig.future.text}
            </p>
          </section>
        ) : (
          <FutureSkeleton />
        )}
      </main>
      <Footer />
    </div>
  )
}
