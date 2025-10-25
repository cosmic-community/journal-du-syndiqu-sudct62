export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SUDCT62</h3>
            <p className="text-gray-400">
              Syndicat de défense des droits des travailleurs du Pas-de-Calais
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/editions" className="text-gray-400 hover:text-white transition-colors">
                  Éditions
                </a>
              </li>
              <li>
                <a href="/articles" className="text-gray-400 hover:text-white transition-colors">
                  Articles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Calais, France</li>
              <li>📧 contact@sudct62.fr</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} SUDCT62. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}