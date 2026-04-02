import { Leaf, Phone, Mail, MapPin } from 'lucide-react'

export default function Lablec() {
  return (
    <footer className="bg-sage-dark text-cream/80">
      {/* Decorative border */}
      <div className="h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-5 h-5 text-sage-light" strokeWidth={1.5} />
              <span className="font-serif text-xl text-cream">Bodzaliget</span>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              Több évtizedes tapasztalattal és a növények iránti szenvedéllyel
              várjuk kertészkedő vendégeinket.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-lg text-cream mb-4">Navigáció</h4>
            <ul className="space-y-2">
              {['Rólunk', 'Termékek', 'Kerti Napló', 'Nyitvatartás', 'Kapcsolat'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    className="text-sm text-cream/50 hover:text-sage-light transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-cream mb-4">Elérhetőség</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <MapPin className="w-4 h-4 text-sage-light flex-shrink-0" strokeWidth={1.5} />
                2072 Zsámbék, Diófa u. 1/a
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Phone className="w-4 h-4 text-sage-light flex-shrink-0" strokeWidth={1.5} />
                +36 30 876 0332
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Mail className="w-4 h-4 text-sage-light flex-shrink-0" strokeWidth={1.5} />
                info@bodzaliget.hu
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream/10 my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Bodzaliget Kertészet. Minden jog fenntartva.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream/40 hover:text-cream/60 transition-colors duration-300">
              Adatvédelem
            </a>
            <a href="#" className="text-xs text-cream/40 hover:text-cream/60 transition-colors duration-300">
              Impresszum
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
