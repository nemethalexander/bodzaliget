import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Heart, Sprout, Sun } from 'lucide-react'

const misszioElemek = [
  {
    ikon: Heart,
    cim: 'Szenvedély',
    szoveg: 'A növények iránti rajongásunk több generációra nyúlik vissza. Minden egyes palánta a gondoskodásunkkal indul útjára.',
  },
  {
    ikon: Sprout,
    cim: 'Fenntarthatóság',
    szoveg: 'Természetközeli módszerekkel dolgozunk, hogy a kertünk és a vásárlóink kertje egyaránt egészséges maradjon.',
  },
  {
    ikon: Sun,
    cim: 'Tudás',
    szoveg: 'Nemcsak növényeket adunk, hanem a tudásunkat is megosztjuk. Tanácsadás, workshopok és személyre szabott útmutatás.',
  },
]

export default function Rolunk() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="rolunk" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Rólunk</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
            Ahol a természet otthon van
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto" />
        </motion.div>

        {/* Photo collage with deckle edges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Main photo */}
            <div className="photo-shadow rounded-sm overflow-hidden deckle-edge">
              <img
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop"
                alt="Kertészet"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
            {/* Overlapping smaller photo */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-40 md:w-52 photo-shadow-alt rounded-sm overflow-hidden deckle-edge border-4 border-cream">
              <img
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=300&h=300&fit=crop"
                alt="Virágok"
                className="w-full h-40 md:h-48 object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-serif text-2xl text-stone-800 mb-4">
              A Bodzaliget története
            </h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              A Bodzaliget Kertészet egy családi vállalkozás, amely több mint két évtizede
              szolgálja ki a növények szerelmeseit. Ami egykor egy kis háztáji kert volt,
              mára a környék egyik legkedveltebb kertészeti központjává nőtte ki magát.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Filozófiánk egyszerű: minőségi növényeket kínálunk, gondos neveléssel és
              személyes tanácsadással. Nem csupán egy kertészet vagyunk — közösséget építünk
              azokból, akik hisznek a zöld jövőben.
            </p>
            <div className="inline-flex items-center gap-2 text-sage text-sm border-b border-sage/30 pb-1 hover:border-sage transition-colors duration-300">
              <span>Ismerjen meg minket</span>
              <span className="text-lg leading-none">&rarr;</span>
            </div>
          </motion.div>
        </div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {misszioElemek.map((elem, index) => (
            <motion.div
              key={elem.cim}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              className="vintage-frame rounded-sm bg-cream/50 p-8 text-center paper-texture"
            >
              <div className="relative z-10">
                <elem.ikon className="w-8 h-8 text-sage mx-auto mb-4" strokeWidth={1} />
                <h4 className="font-serif text-lg text-stone-800 mb-3">{elem.cim}</h4>
                <p className="text-sm text-stone-600 leading-relaxed">{elem.szoveg}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
