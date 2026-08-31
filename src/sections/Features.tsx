import Wrap from '@/components/Wrap';
import SecHead from '@/components/SecHead';
import FeatureCard from '@/sections/FeatureCard';
import { FEATURES } from '@/data/features';

export default function Features({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  return (
    <section id="palvelut" data-track-section="palvelut" className="py-24 max-md:py-16">
      <Wrap>
        <SecHead
          as={headingAs}
          eyebrow="[TÄYDENNÄ]"
          title="[TÄYDENNÄ: yksi kysymys tai väite otsikkoa kohti.]"
          text="[TÄYDENNÄ: yksi lause, joka vastaa otsikon kysymykseen heti.]"
        />
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
