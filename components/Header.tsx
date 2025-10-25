import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">📰</span>
            <span className="font-bold text-xl text-gray-900">
              SUDCT62
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/editions"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Éditions
            </Link>
            <Link 
              href="/articles"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Articles
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}