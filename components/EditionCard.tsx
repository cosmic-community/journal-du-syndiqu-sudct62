import { Edition } from '@/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface EditionCardProps {
  edition: Edition;
  featured?: boolean;
}

export default function EditionCard({ edition, featured = false }: EditionCardProps) {
  const coverImage = edition.metadata.cover_image?.imgix_url;
  const articlesCount = edition.metadata.articles?.length || 0;

  const cardClass = featured
    ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow";

  const imageSize = featured
    ? { w: 1200, h: 500 }
    : { w: 800, h: 400 };

  return (
    <Link href={`/editions/${edition.slug}`} className="block">
      <article className={cardClass}>
        {coverImage && (
          <div className="relative">
            <img
              src={`${coverImage}?w=${imageSize.w}&h=${imageSize.h}&fit=crop&auto=format,compress`}
              alt={edition.metadata.main_title}
              className="w-full h-auto"
              width={imageSize.w}
              height={imageSize.h}
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                Édition N°{edition.metadata.edition_number}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
            <span>{formatDate(edition.metadata.publication_date)}</span>
            {edition.metadata.location && (
              <>
                <span>•</span>
                <span>📍 {edition.metadata.location}</span>
              </>
            )}
          </div>

          <h3 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-3xl' : 'text-2xl'}`}>
            {edition.metadata.main_title}
          </h3>

          {edition.metadata.subtitle && (
            <p className="text-gray-600 mb-4">
              {edition.metadata.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {articlesCount} article{articlesCount > 1 ? 's' : ''}
            </span>
            <span className="text-primary font-medium hover:underline">
              Lire l'édition →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}