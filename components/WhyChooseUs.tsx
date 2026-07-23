import Image from 'next/image'
import { FiUsers, FiHome, FiFeather, FiShield } from 'react-icons/fi'
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection'
import type { HomepageContent } from '@/lib/types'

const ICONS: Record<string, typeof FiUsers> = {
  guides: FiUsers,
  lodging: FiHome,
  conservation: FiFeather,
  concierge: FiShield,
}

interface WhyChooseUsProps {
  content: HomepageContent
}

export default function WhyChooseUs({ content }: WhyChooseUsProps) {
  const features = content.whyChooseFeatures ?? []
  const imageSrc = content.whyChooseImage?.imageUrl

  return (
    <section className="bg-cream-100 px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Text */}
        <AnimatedSection direction="left" className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-500">
              {content.whyChooseLabel ?? 'Unmatched Excellence'}
            </span>
            <h2 className="font-serif text-4xl font-extrabold leading-tight text-earth-900 md:text-5xl">
              {content.whyChooseHeading ?? 'Why Choose Minzah Safaris'}
            </h2>
            <p className="text-lg leading-relaxed text-earth-600">{content.whyChooseBody}</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2" staggerChildren={0.1}>
            {features.map((feature) => {
              const Icon = (feature.icon && ICONS[feature.icon]) || FiUsers
              return (
                <StaggerItem
                  key={feature.title}
                  className="card-base flex flex-col gap-4 rounded-2xl border border-cream-200 p-6"
                >
                  <Icon size={32} className="text-gold-500" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-earth-900">{feature.title}</h4>
                    <p className="text-sm leading-relaxed text-earth-500">{feature.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection direction="right" className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-luxury">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Minzah Safaris in the field"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            )}
          </div>
          <div className="absolute -bottom-8 -left-8 hidden rounded-2xl bg-gold-400 p-8 text-earth-900 shadow-xl md:block">
            <p className="mb-1 text-5xl font-black">{content.whyChooseBadgeNumber ?? '15+'}</p>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">
              {content.whyChooseBadgeLabel ?? 'Years of Experience'}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
