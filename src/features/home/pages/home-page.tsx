import { ContactSection } from '../components/contact/contact-section'
import { CustomersSection } from '../components/customers-section'
import { HeroSection } from '../components/hero/hero-section'
import { InsightsSection } from '../components/insights-section'
import { NewsEventsSection } from '../components/news-events/news-events-section'
import { ProductsSection } from '../components/products/products-section'
import { TrustSection } from '../components/trust-section'
import { useHomeMotion } from '../hooks/use-home-motion'

export function HomePage() {
  useHomeMotion()

  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProductsSection />
      <CustomersSection />
      <NewsEventsSection />
      <InsightsSection />
      <ContactSection />
    </>
  )
}
