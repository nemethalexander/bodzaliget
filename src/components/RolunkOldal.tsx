import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Sprout, Sun, Leaf, Users, Award } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Lablec from './Lablec'
import kep1 from '../assets/img/1.webp'
import kep2 from '../assets/img/2.webp'
import kep3 from '../assets/img/3.webp'
import kep4 from '../assets/img/4.webp'
import kep5 from '../assets/img/5.webp'
import kep6 from '../assets/img/6.webp'
import kep7 from '../assets/img/7.webp'

interface Props {
  onVissza: () => void
}

const idovonal = [
  {
    ev: '2001',
    esemeny: 'Alapítás',
    leiras: 'Egy kis háztáji kertből indult minden. A család szenvedélye volt a mozgatóerő — az első palánták saját magvetésből kerültek ki.',
  },
  {
    ev: '2008',
    esemeny: 'Első bővítés',
    leiras: 'Megnyílt a cserepes dísznövények részlege és az első üvegház is elkészült, így télen is tudtunk palántákat nevelni.',
  },
  {
    ev: '2015',
    esemeny: 'Workshopok indulása',
    leiras: 'Elindítottuk közösségi kertprogramjainkat és szakmai tanácsadói szolgáltatásunkat. Azóta több száz embernek segítettük megtalálni a kertészkedés örömét.',
  },
  {
    ev: '2023',
    esemeny: 'Megújulás',
    leiras: 'Modern kiszolgálás, szélesebb növénykínálat és digitális jelenlét. A hagyomány megmaradt, a keret megújult.',
  },
]

const statisztikak = [
  { szam: '20+', felirat: 'év tapasztalat' },
  { szam: '5000+', felirat: 'elégedett vásárló' },
  { szam: '300+', felirat: 'növényfajta' },
  { szam: '12', felirat: 'workshop évente' },
]

const ertekek = [
  {
    ikon: Heart,
    cim: 'Szenvedély',
    szoveg: 'A növények iránti rajongásunk több generációra nyúlik vissza. Minden egyes palánta a gondoskodásunkkal indul útjára — ez nem munka, ez hivatás.',
  },
  {
    ikon: Sprout,
    cim: 'Fenntarthatóság',
    szoveg: 'Természetközeli módszerekkel dolgozunk, minimális vegyszerhasználattal. A föld egészségét ma kell óvni — holnap talán már késő.',
  },
  {
    ikon: Sun,
    cim: 'Tudás',
    szoveg: 'Nemcsak növényeket adunk, hanem a tudásunkat is megosztjuk. Személyre szabott tanácsadás, workshopok és útmutatás mindenkinek.',
  },
  {
    ikon: Leaf,
    cim: 'Minőség',
    szoveg: 'Csak egészséges, gondosan nevelt növények kerülnek a polcokra. A minőséget nem engedjük kompromisszumba menni soha.',
  },
  {
    ikon: Users,
    cim: 'Közösség',
    szoveg: 'Nem csak vásárlóink vagytok — közösséget alkotunk. Aki egyszer betér hozzánk, rendszerint visszatér. Ez a mi legnagyobb büszkeségünk.',
  },
  {
    ikon: Award,
    cim: 'Tapasztalat',
    szoveg: 'Több mint két évtizedes jelenlét a piacon. Ebben az időben rengeteg kérdést, problémát és sikert láttunk és tanultunk belőlük.',
  },
]

function StatSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {statisztikak.map((s, i) => (
        <motion.div
          key={s.felirat}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className="text-center"
        >
          <p className="font-serif text-4xl md:text-5xl text-sage-light mb-2">{s.szam}</p>
          <p className="text-xs tracking-[0.25em] uppercase text-cream/60">{s.felirat}</p>
        </motion.div>
      ))}
    </div>
  )
}

function IdovonaSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sage/25 md:-translate-x-px" />
      <div className="space-y-14">
        {idovonal.map((elem, i) => (
          <motion.div
            key={elem.ev}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className={`relative flex items-start pl-16 md:pl-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-sage-light border-2 border-sepia-100 mt-1.5 z-10" />
            <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
              <span className="text-xs tracking-[0.3em] uppercase text-sage-light font-medium">{elem.ev}</span>
              <h4 className="font-serif text-xl text-stone-800 mt-1 mb-2">{elem.esemeny}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{elem.leiras}</p>
            </div>
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function RolunkOldal({ onVissza }: Props) {
  const { ref: tortenetRef, isVisible: tortenetLathato } = useScrollReveal()
  const { ref: ertekekRef, isVisible: ertekekLathato } = useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-cream">

      {/* Sticky visszagomb */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sepia-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={onVissza}
            className="group flex items-center gap-2 text-sage hover:text-sage-dark transition-colors duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            <span className="text-sm tracking-wide">Vissza a főoldalra</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img src={kep1} alt="Bodzaliget" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/25 via-stone-900/15 to-stone-900/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase text-sage-light mb-4"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              Bodzaliget Kertészet
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl text-cream leading-tight mb-5"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
            >
              Ismerj meg minket
            </h1>
            <div className="w-16 h-0.5 bg-sage-light mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Történet */}
      <section className="py-24 px-6">
        <div ref={tortenetRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={tortenetLathato ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Történetünk</p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-5 leading-tight">
                Több mint két évtized<br />a természet szolgálatában
              </h2>
              <div className="w-12 h-0.5 bg-sage mb-8" />
              <p className="text-stone-600 leading-relaxed mb-4">
                A Bodzaliget Kertészet 2001-ben indult egy egyszerű álommal: olyan helyet teremteni, ahol a természet szerelmesei otthon érezhetik magukat. Amit akkor egy kis háztáji kertként kezdtünk, mára a környék egyik legkedveltebb kertészeti központjává nőtte ki magát.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Minden, ami itt növekszik, a saját kezünkkel kezd el gyökerezni. Nem nagyüzemi szállítótól vesszük át a palántákat — mi neveljük őket az első hajtástól fogva, hogy biztosan egészséges, erős növénnyel gazdagodj.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Filosófiánk egyszerű: minőségi növényeket kínálunk, gondos neveléssel és személyes tanácsadással. Nem csupán egy kertészet vagyunk — közösséget építünk azokból, akik hisznek a zöld jövőben.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={tortenetLathato ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mt-10 lg:mt-0"
            >
              <div className="photo-shadow rounded-sm overflow-hidden">
                <img src={kep4} alt="Kertészet" className="w-full h-80 md:h-[430px] object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-4 md:-left-8 w-40 md:w-52 photo-shadow-alt rounded-sm overflow-hidden border-4 border-cream">
                <img src={kep5} alt="Virágok" className="w-full h-40 md:h-48 object-cover object-bottom" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statisztikák */}
      <section className="py-20 px-6 bg-sage-dark">
        <div className="max-w-6xl mx-auto">
          <StatSection />
        </div>
      </section>

      {/* Galéria */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Galéria</p>
            <h2 className="font-serif text-3xl text-stone-800">Egy pillantás a kertészetbe</h2>
            <div className="w-12 h-0.5 bg-sage mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Nagy kép bal oldal */}
            <div className="col-span-2 md:col-span-1 row-span-2 overflow-hidden rounded-sm" style={{ minHeight: '400px' }}>
              <img src={kep3} alt="Kertészet" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ minHeight: '400px' }} />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img src={kep1} alt="Palánták" loading="lazy" className="w-full h-48 md:h-[194px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img src={kep2} alt="Virágok" loading="lazy" className="w-full h-48 md:h-[194px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img src={kep4} alt="Növények" loading="lazy" className="w-full h-48 md:h-[194px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img src={kep5} alt="Kert" loading="lazy" className="w-full h-48 md:h-[194px] object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: 'center 70%' }} />
            </div>
            <div className="col-span-2 md:col-span-2 overflow-hidden rounded-sm">
              <img src={kep6} alt="Kertészet 2" loading="lazy" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700" style={{ objectPosition: 'center 30%' }} />
            </div>
            <div className="col-span-2 md:col-span-1 overflow-hidden rounded-sm">
              <img src={kep7} alt="Kertészet 3" loading="lazy" className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Idővonal */}
      <section className="py-24 px-6 bg-sepia-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Mérföldkövek</p>
            <h2 className="font-serif text-3xl text-stone-800">Hogyan jutottunk idáig</h2>
            <div className="w-12 h-0.5 bg-sage mx-auto mt-4" />
          </div>
          <IdovonaSection />
        </div>
      </section>

      {/* Értékeink */}
      <section className="py-24 px-6">
        <div ref={ertekekRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Értékeink</p>
            <h2 className="font-serif text-3xl text-stone-800">Amiben hiszünk</h2>
            <div className="w-12 h-0.5 bg-sage mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ertekek.map((elem, i) => (
              <motion.div
                key={elem.cim}
                initial={{ opacity: 0, y: 20 }}
                animate={ertekekLathato ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="vintage-frame rounded-sm bg-cream/50 p-8 paper-texture"
              >
                <div className="relative z-10">
                  <elem.ikon className="w-8 h-8 text-sage mb-4" strokeWidth={1} />
                  <h4 className="font-serif text-lg text-stone-800 mb-3">{elem.cim}</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">{elem.szoveg}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Idézet */}
      <section className="py-20 px-6 bg-sage-dark">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed text-cream/90 italic mb-6">
            „Aki kertészkedik, az bízik a jövőben."
          </blockquote>
          <p className="text-xs tracking-[0.3em] uppercase text-sage-light/60">— Bodzaliget Kertészet</p>
        </div>
      </section>

      <Lablec compact />
    </div>
  )
}
