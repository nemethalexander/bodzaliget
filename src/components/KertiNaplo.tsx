import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Calendar, ArrowRight } from 'lucide-react'

interface BejegyzesAdat {
  cim: string
  kivonat: string
  datum: string
  kep: string
  kategoria: string
}

const bejegyzesek: BejegyzesAdat[] = [
  {
    cim: 'A tökéletes komposzt titka',
    kivonat: 'Hogyan készítsünk otthon prémium minőségű komposztot, amely a kert legjobb tápanyagforrása lesz? Mutatjuk a lépéseket.',
    datum: '2025. március 15.',
    kep: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    kategoria: 'Tippek',
  },
  {
    cim: 'Tavaszi metszés — mikor és hogyan',
    kivonat: 'A helyes metszés elengedhetetlen a gyümölcsfák és díszcserjék egészségéhez. Útmutatónk segít a kezdésben.',
    datum: '2025. március 8.',
    kep: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=300&fit=crop',
    kategoria: 'Útmutató',
  },
  {
    cim: 'Méhbarát kert kialakítása',
    kivonat: 'A beporzók védelme kulcsfontosságú. Ismerd meg azokat a növényeket, amelyek a méheket és pillangókat vonzzák.',
    datum: '2025. február 22.',
    kep: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    kategoria: 'Ökokert',
  },
]

export default function KertiNaplo() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="blog" className="py-24 px-6 bg-cream-dark paper-texture">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Kerti Napló</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
            Gondolatok a kertből
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto" />
        </motion.div>

        {/* Blog cards — postcard style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bejegyzesek.map((bejegyzes, index) => (
            <motion.article
              key={bejegyzes.cim}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 + index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="vintage-frame rounded-sm overflow-hidden bg-cream transition-shadow duration-500 group-hover:shadow-lg">
                {/* Image with postcard top */}
                <div className="relative overflow-hidden">
                  <img
                    src={bejegyzes.kep}
                    alt={bejegyzes.cim}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category stamp */}
                  <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-sage font-medium">
                      {bejegyzes.kategoria}
                    </span>
                  </div>
                </div>

                {/* Content — postcard feel */}
                <div className="p-6">
                  {/* Postcard line decoration */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-sepia-200/40" />
                    <div className="w-1.5 h-1.5 rounded-full border border-sepia-300/40" />
                    <div className="h-px flex-1 bg-sepia-200/40" />
                  </div>

                  <h3 className="font-serif text-lg text-stone-800 mb-2 group-hover:text-sage transition-colors duration-500">
                    {bejegyzes.cim}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3">
                    {bejegyzes.kivonat}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-sepia-400">
                      <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {bejegyzes.datum}
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage/40 group-hover:text-sage group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* See all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-sage border-b border-sage/30 pb-1 hover:border-sage transition-colors duration-300"
          >
            Összes bejegyzés
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
