import { GlowButton } from '#/components/ui/glow-button'
import { NotchedCard } from '#/components/ui/notched-card'
import { SectionHeader } from '#/components/ui/section-header'

import { latestArticles } from '../constants/articles'

export function InsightsSection() {
  return (
    <section
      id="insights"
      className="relative isolate z-1 w-full overflow-clip bg-background px-page py-16 text-foreground lg:py-24"
    >
      <SectionHeader
        badge="Artikel"
        title="Artikel & Aplikasi Teknis Terbaru"
        action={
          <GlowButton
            href="#sitefooter"
            label="Lihat Semua"
            variant="outline"
          />
        }
      />

      <div
        className="mt-[clamp(28px,4vh,48px)] grid grid-cols-1 gap-x-[clamp(20px,2.4vw,32px)] gap-y-11 min-[880px]:grid-cols-3"
        data-reveal
      >
        {latestArticles.map((article) => (
          <NotchedCard
            key={article.id}
            href={article.href}
            title={article.title}
            description={article.excerpt}
            image={article.image}
            imageAlt={article.title}
            badge={article.date}
            tags={article.tags}
          />
        ))}
      </div>
    </section>
  )
}
