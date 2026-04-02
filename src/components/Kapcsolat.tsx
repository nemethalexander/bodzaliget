import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Send, Phone, Mail, MapPin, Loader2, Leaf } from 'lucide-react'

const WEB3FORMS_KEY = '10ac4249-c703-45e7-8934-bcd81ff71bd5'
const RATE_LIMIT_KEY = 'bodzaliget-uzenet-datum'

// MailerLite API key — cseréld ki: https://dashboard.mailerlite.com/integrations/api
const MAILERLITE_KEY = 'YOUR_MAILERLITE_API_KEY'
// MailerLite group ID — a "Hírlevél" csoportod ID-ja
const MAILERLITE_GROUP = 'YOUR_GROUP_ID'

interface FormAdatok {
  nev: string
  email: string
  targy: string
  uzenet: string
  gdpr: boolean
}

function generateFingerprint(): string {
  const data = [
    screen.width,
    screen.height,
    screen.colorDepth,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency,
  ].join('|')
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

function marKuldottMa(): boolean {
  try {
    const datum = localStorage.getItem(RATE_LIMIT_KEY)
    if (!datum) return false
    const ma = new Date().toDateString()
    return datum === ma
  } catch {
    return false
  }
}

function kuldesMentese(): void {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, new Date().toDateString())
  } catch {
    // Private browsing — localStorage may not be available
  }
}

export default function Kapcsolat() {
  const { ref, isVisible } = useScrollReveal()
  const [elkuldve, setElkuldve] = useState(false)
  const [hiba, setHiba] = useState('')
  const [kuldes, setKuldes] = useState(false)
  const [napiLimit, setNapiLimit] = useState(false)
  const [hirEmail, setHirEmail] = useState('')
  const [hirFeliratkozott, setHirFeliratkozott] = useState(false)
  const [hirKuldes, setHirKuldes] = useState(false)
  const [form, setForm] = useState<FormAdatok>({
    nev: '',
    email: '',
    targy: '',
    uzenet: '',
    gdpr: false,
  })

  useEffect(() => {
    setNapiLimit(marKuldottMa())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHiba('')

    if (!form.gdpr) {
      setHiba('Kérjük, fogadja el az adatkezelési feltételeket.')
      return
    }

    if (napiLimit) {
      setHiba('Naponta csak egy üzenetet küldhet. Kérjük, próbálja újra holnap.')
      return
    }

    setKuldes(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Bodzaliget — ${form.targy}`,
          from_name: form.nev,
          name: form.nev,
          email: form.email,
          message: form.uzenet,
          // Fingerprint for duplicate detection
          _fingerprint: generateFingerprint(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        kuldesMentese()
        setNapiLimit(true)
        setElkuldve(true)
      } else {
        setHiba('Hiba történt a küldés során. Kérjük, próbálja újra később.')
      }
    } catch {
      setHiba('Hálózati hiba. Kérjük, ellenőrizze az internetkapcsolatát.')
    } finally {
      setKuldes(false)
    }
  }

  const handleHirlevel = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hirEmail) return
    setHirKuldes(true)
    try {
      const response = await fetch('https://api.mailerlite.com/api/v2/groups/' + MAILERLITE_GROUP + '/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': MAILERLITE_KEY,
        },
        body: JSON.stringify({
          email: hirEmail,
          resubscribe: false,
        }),
      })
      if (response.ok) {
        setHirFeliratkozott(true)
      }
    } catch {
      // Fallback: send via Web3Forms so the email is not lost
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Bodzaliget — Hírlevél feliratkozás (fallback)',
          email: hirEmail,
          message: `Hírlevél feliratkozás: ${hirEmail}`,
        }),
      })
      setHirFeliratkozott(true)
    } finally {
      setHirKuldes(false)
    }
  }

  const gombLetiltva = kuldes || !form.gdpr || napiLimit

  return (
    <section id="kapcsolat" className="py-24 px-6 bg-parchment paper-texture">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-3">Írjon nekünk</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
            Kapcsolat
          </h2>
          <div className="w-16 h-0.5 bg-sage mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="font-serif text-xl text-stone-800 mb-6">
              Lépjen kapcsolatba velünk
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-8">
              Kérdése van növényeinkkel, szolgáltatásainkkal kapcsolatban, vagy
              egyéni tanácsadást szeretne kérni? Szívesen állunk rendelkezésére!
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-sage" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-sm text-stone-800">Címünk</p>
                  <p className="text-xs text-stone-600 mt-1">2072 Zsámbék, Diófa u. 1/a</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-sage" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-sm text-stone-800">Telefonszám</p>
                  <p className="text-xs text-stone-600 mt-1">+36 30 876 0332</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-sage" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-sm text-stone-800">E-mail</p>
                  <p className="text-xs text-stone-600 mt-1">info@bodzaliget.hu</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10 pt-8 border-t border-sepia-200/40">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-sage" strokeWidth={1.5} />
                <h4 className="font-serif text-sm text-stone-800">Hírlevél</h4>
              </div>
              {hirFeliratkozott ? (
                <p className="text-xs text-sage">
                  Köszönjük a feliratkozást! Hamarosan értesítjük.
                </p>
              ) : (
                <>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    Iratkozzon fel és értesüljön elsőként ajánlatainkról, szezonális újdonságainkról.
                  </p>
                  <form onSubmit={handleHirlevel} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={hirEmail}
                      onChange={(e) => setHirEmail(e.target.value)}
                      placeholder="E-mail címe"
                      className="flex-1 px-3 py-2.5 bg-cream-dark/50 border border-sepia-200/50 rounded-sm text-xs text-stone-800 placeholder:text-sepia-400/50 focus:outline-none focus:border-sage/40 transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      disabled={hirKuldes}
                      className="px-4 py-2.5 bg-sage text-cream text-xs rounded-sm hover:bg-sage-dark transition-colors duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {hirKuldes ? '...' : 'Feliratkozás'}
                    </button>
                  </form>
                  <p className="text-[10px] text-sepia-400 mt-2">
                    Bármikor leiratkozhat. Adatait bizalmasan kezeljük.
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="vintage-frame rounded-sm bg-cream p-8 md:p-10">
              {elkuldve ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <Send className="w-10 h-10 text-sage mx-auto mb-4" strokeWidth={1} />
                  <h3 className="font-serif text-xl text-stone-800 mb-2">Üzenet elküldve!</h3>
                  <p className="text-sm text-stone-600">
                    Köszönjük megkeresését, hamarosan válaszolunk.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Daily limit notice */}
                  {napiLimit && (
                    <div className="text-xs text-clay bg-clay/5 border border-clay/15 rounded-sm px-4 py-3">
                      Ma már küldött üzenetet. Kérjük, próbálja újra holnap.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nev" className="block text-xs text-stone-600 mb-2 tracking-wide">
                        Név <span className="text-clay">*</span>
                      </label>
                      <input
                        id="nev"
                        name="nev"
                        type="text"
                        required
                        disabled={napiLimit}
                        value={form.nev}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream-dark/50 border border-sepia-200/50 rounded-sm text-sm text-stone-800 placeholder:text-sepia-400/50 focus:outline-none focus:border-sage/40 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Teljes neve"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-stone-600 mb-2 tracking-wide">
                        E-mail <span className="text-clay">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={napiLimit}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream-dark/50 border border-sepia-200/50 rounded-sm text-sm text-stone-800 placeholder:text-sepia-400/50 focus:outline-none focus:border-sage/40 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="E-mail címe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="targy" className="block text-xs text-stone-600 mb-2 tracking-wide">
                      Tárgy <span className="text-clay">*</span>
                    </label>
                    <input
                      id="targy"
                      name="targy"
                      type="text"
                      required
                      disabled={napiLimit}
                      value={form.targy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-dark/50 border border-sepia-200/50 rounded-sm text-sm text-stone-800 placeholder:text-sepia-400/50 focus:outline-none focus:border-sage/40 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Üzenetének tárgya"
                    />
                  </div>

                  <div>
                    <label htmlFor="uzenet" className="block text-xs text-stone-600 mb-2 tracking-wide">
                      Üzenet <span className="text-clay">*</span>
                    </label>
                    <textarea
                      id="uzenet"
                      name="uzenet"
                      required
                      rows={5}
                      disabled={napiLimit}
                      value={form.uzenet}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-dark/50 border border-sepia-200/50 rounded-sm text-sm text-stone-800 placeholder:text-sepia-400/50 focus:outline-none focus:border-sage/40 transition-colors duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Írja le kérdését vagy kérését..."
                    />
                  </div>

                  {/* GDPR consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="gdpr"
                      name="gdpr"
                      type="checkbox"
                      checked={form.gdpr}
                      disabled={napiLimit}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 accent-sage cursor-pointer disabled:cursor-not-allowed"
                    />
                    <label htmlFor="gdpr" className="text-xs text-stone-600 leading-relaxed cursor-pointer">
                      Elolvastam és elfogadom az{' '}
                      <a href="#" className="text-sage underline underline-offset-2 hover:text-sage-dark transition-colors">
                        Adatkezelési Tájékoztatót
                      </a>
                      . Hozzájárulok, hogy a megadott személyes adataimat a Bodzaliget Kertészet
                      a megkeresésem megválaszolása céljából kezelje. <span className="text-clay">*</span>
                    </label>
                  </div>

                  {/* Error message */}
                  {hiba && (
                    <p className="text-xs text-clay bg-clay/5 border border-clay/15 rounded-sm px-4 py-2.5">
                      {hiba}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={gombLetiltva}
                    className="w-full sm:w-auto px-8 py-3 bg-sage text-cream text-sm tracking-wide rounded-sm hover:bg-sage-dark transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-sage"
                  >
                    {kuldes ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                        Küldés...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                        Üzenet küldése
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
