import { Article } from '@/types'
import { formatDate, getExcerpt } from '@/lib/utils'
import Link from 'next/link'

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const featuredImage = article.metadata.featured_image?.imgix_url;
  const category = article.metadata.category;

  return (
    <Link href={`/articles/${article.slug}`} className="block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {featuredImage && (
          <div className="relative">
            <img
              src={`${featuredImage}?w=600&h=300&fit=crop&auto=format,compress`}
              alt={article.metadata.article_title}
              className="w-full h-48 object-cover"
              width="300"
              height="150"
            />
            {category && (
              <div className="absolute top-3 left-3">
                <span 
                  className="px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: category.metadata.color || '#6366f1' }}
                >
                  {category.metadata.name}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
            {article.metadata.author && (
              <span>Par {article.metadata.author}</span>
            )}
            {article.metadata.publish_date && (
              <>
                {article.metadata.author && <span>•</span>}
                <span>{formatDate(article.metadata.publish_date)}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {article.metadata.article_title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {getExcerpt(article.metadata.content)}
          </p>

          <span className="text-primary font-medium hover:underline">
            Lire l'article →
          </span>
        </div>
      </article>
    </Link>
  )
}