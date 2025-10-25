import { cosmic, hasStatus } from '@/lib/cosmic'
import { Edition, Article } from '@/types'
import EditionCard from '@/components/EditionCard'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

async function getEditions(): Promise<Edition[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'editions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const editions = response.objects as Edition[];
    return editions.sort((a, b) => 
      (b.metadata.edition_number || 0) - (a.metadata.edition_number || 0)
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getRecentArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const articles = response.objects as Article[];
    return articles
      .sort((a, b) => {
        const dateA = new Date(a.metadata.publish_date || '').getTime();
        const dateB = new Date(b.metadata.publish_date || '').getTime();
        return dateB - dateA;
      })
      .slice(0, 6);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function HomePage() {
  const editions = await getEditions();
  const recentArticles = await getRecentArticles();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Journal du Syndiqué SUDCT62
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Actualités, informations et défense des droits des travailleurs
        </p>
      </section>

      {/* Latest Edition */}
      {editions.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Dernière Édition</h2>
            <Link 
              href="/editions"
              className="text-primary hover:underline font-medium"
            >
              Voir toutes les éditions →
            </Link>
          </div>
          <EditionCard edition={editions[0]} featured />
        </section>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Articles Récents</h2>
            <Link 
              href="/articles"
              className="text-primary hover:underline font-medium"
            >
              Voir tous les articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {editions.length === 0 && recentArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            Aucun contenu disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  )
}