import { cosmic, hasStatus } from '@/lib/cosmic'
import { Article, Category } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'

async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata.publish_date || '').getTime();
      const dateB = new Date(b.metadata.publish_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export const metadata = {
  title: 'Articles - Journal du Syndiqué SUDCT62',
  description: 'Tous les articles du journal syndical SUDCT62',
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tous les Articles</h1>
        <p className="text-lg text-gray-600">
          Découvrez tous nos articles sur les droits des travailleurs et la vie syndicale
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>
      )}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            Aucun article disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  )
}