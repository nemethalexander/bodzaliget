import { Leaf } from 'lucide-react'

export default function Elvalaszto() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-sepia-200/60" />
      <Leaf className="w-4 h-4 text-sage/30" strokeWidth={1} />
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-sepia-200/60" />
    </div>
  )
}
