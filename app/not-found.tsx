import Link from 'next/link'
import Image from 'next/image'

const BG = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=60'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={BG} alt="404" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-earth-900/85" />
      </div>
      <div className="relative z-10 text-center px-6">
        <p className="label-gold mb-4">404</p>
        <h1 className="font-serif text-cream-100 text-7xl font-bold mb-4">Lost in Tanzania?</h1>
        <p className="text-cream-100/70 text-lg mb-10 max-w-md mx-auto">
          Even experienced explorers take a wrong turn. Let's get you back on the map.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/blog" className="btn-outline-light">Read the Blog</Link>
        </div>
      </div>
    </div>
  )
}
