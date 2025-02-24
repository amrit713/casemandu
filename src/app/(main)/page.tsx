import { HeroSection } from "@/components/landing-page/hero-section";
import { CustomerReview } from "@/components/landing-page/customer-review";
import { Reviews } from "@/components/landing-page/review";
import { Information } from "@/components/landing-page/information";

export default async function Home() {
  return (
    <div className="bg-gray-50 grainy-light">
      <section>
        <HeroSection />
      </section>
      <section className="bg-slate-100 grainy-dark py-24">
        <CustomerReview />
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section className={"pb-12"}>
        <Information />
      </section>
    </div>
  );
}
