// app/articles/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Article } from '@/types'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'articles',
      slug,
    }).depth(1);
    
    return response.object as Article;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const featuredImage = article.metadata.featured_image?.imgix_url;
  const category = article.metadata.category;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Article Header */}
      <div className="mb-8">
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-block mb-4"
          >
            <span 
              className="px-4 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: category.metadata.color || '#6366f1' }}
            >
              {category.metadata.name}
            </span>
          </Link>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.metadata.article_title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {article.metadata.author && (
            <span>Par {article.metadata.author}</span>
          )}
          {article.metadata.publish_date && (
            <>
              <span>•</span>
              <span>{formatDate(article.metadata.publish_date)}</span>
            </>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src={`${featuredImage}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={article.metadata.article_title}
            className="w-full h-auto"
            width="1200"
            height="600"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.metadata.content}
        </ReactMarkdown>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link 
          href="/articles"
          className="text-primary hover:underline font-medium"
        >
          ← Retour aux articles
        </Link>
      </div>
    </article>
  )
}