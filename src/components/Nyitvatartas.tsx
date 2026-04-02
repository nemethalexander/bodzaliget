import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Clock, MapPin, Car } from 'lucide-react'

const nyitvatartasAdatok = [
  { nap: 'Hétfő', ora: 'Zárva' },
  { nap: 'Kedd – Péntek', ora: '9:00 – 16:00' },
  { nap: 'Szombat', ora: '9:00 – 15:00' },
  { nap: 'Vasárnap', ora: 'Zárva' },
]

export default function Nyitvatartas() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="nyitvatartas" className="py-24 px-6 bg-sage-dark text-cream paper-texture">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-cream/70 mb-3">Látogasson el hozzánk</p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
            Megközelítés & Nyitvatartás
          </h2>
          <div className="w-16 h-px bg-cream/30 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="vintage-frame bg-cream rounded-sm p-8 md:p-10">
              {/* Decorative header */}
              <div className="text-center mb-8">
                <Clock className="w-8 h-8 text-sage mx-auto mb-3" strokeWidth={1} />
                <h3 className="font-serif text-2xl text-stone-800">Nyitvatartás</h3>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="flex-1 h-px bg-sepia-200/60" />
                  <span className="text-xs text-sepia-400 tracking-widest uppercase">2026/2027</span>
                  <div className="flex-1 h-px bg-sepia-200/60" />
                </div>
              </div>

              {/* Hours table */}
              <div className="space-y-0">
                {nyitvatartasAdatok.map((adat) => (
                  <div
                    key={adat.nap}
                    className="flex justify-between items-center py-4 border-b border-sepia-200/30 last:border-0"
                  >
                    <span className="font-serif text-stone-700">{adat.nap}</span>
                    <span className="flex items-center gap-2">
                      <span className="flex-1 border-b border-dotted border-sepia-300/50 w-12" />
                      <span className={`text-sm font-medium ${adat.ora === 'Zárva' ? 'text-clay' : 'text-sage'}`}>
                        {adat.ora}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-6 p-4 bg-sage/5 rounded-sm border border-sage/10">
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong className="text-sage">Figyelem:</strong> Ünnepnapokon és szezonális változások esetén
                  a nyitvatartás eltérhet. Kérjük, kövessék közösségi oldalainkat!
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex items-start gap-3 flex-1 vintage-frame bg-cream rounded-sm p-5">
                <MapPin className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-sm text-stone-800">Cím</p>
                  <p className="text-xs text-stone-600 mt-1">2072 Zsámbék, Diófa u. 1/a</p>
                </div>
              </div>
              <div className="flex items-start gap-3 flex-1 vintage-frame bg-cream rounded-sm p-5">
                <Car className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-sm text-stone-800">Parkolás</p>
                  <p className="text-xs text-stone-600 mt-1">Ingyenes parkolás a kertészet előtt.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="vintage-frame rounded-sm overflow-hidden bg-cream min-h-[400px]"
          >
            <iframe
              title="Bodzaliget Kertészet helyszíne"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.83161945024!2d18.725638976790158!3d47.551605791772985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476a73913750e783%3A0x9a6b4d56d56929bb!2sBodzaliget%20Kert%C3%A9szet!5e0!3m2!1shu!2shu!4v1775132017352!5m2!1shu!2shu"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
