// app/editions/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Edition } from '@/types'
import { formatDate } from '@/lib/utils'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'

async function getEdition(slug: string): Promise<Edition | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'editions',
      slug,
    }).depth(1);
    
    return response.object as Edition;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const edition = await getEdition(slug);

  if (!edition) {
    notFound();
  }

  const coverImage = edition.metadata.cover_image?.imgix_url;
  const articles = edition.metadata.articles || [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Edition Header */}
      <div className="mb-12">
        {coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${coverImage}?w=1200&h=400&fit=crop&auto=format,compress`}
              alt={edition.metadata.main_title}
              className="w-full h-auto"
              width="1200"
              height="400"
            />
          </div>
        )}

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="bg-primary text-white px-3 py-1 rounded-full font-medium">
            Édition N°{edition.metadata.edition_number}
          </span>
          <span>{formatDate(edition.metadata.publication_date)}</span>
          {edition.metadata.location && (
            <span>📍 {edition.metadata.location}</span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {edition.metadata.main_title}
        </h1>
        
        {edition.metadata.subtitle && (
          <p className="text-xl text-gray-600">
            {edition.metadata.subtitle}
          </p>
        )}
      </div>

      {/* Articles */}
      {articles.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Articles de cette édition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600">
            Aucun article dans cette édition.
          </p>
        </div>
      )}
    </div>
  )
}