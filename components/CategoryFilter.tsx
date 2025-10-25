'use client'

import { Category } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryClick = (slug: string) => {
    if (currentCategory === slug) {
      router.push('/articles');
    } else {
      router.push(`/articles?category=${slug}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => router.push('/articles')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategory
            ? 'bg-gray-900 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Tous les articles
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium text-white transition-opacity ${
            currentCategory === category.slug ? 'opacity-100' : 'opacity-75 hover:opacity-100'
          }`}
          style={{ backgroundColor: category.metadata.color || '#6366f1' }}
        >
          {category.metadata.name}
        </button>
      ))}
    </div>
  )
}