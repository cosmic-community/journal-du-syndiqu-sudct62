import { cosmic, hasStatus } from '@/lib/cosmic'
import { Edition } from '@/types'
import EditionCard from '@/components/EditionCard'

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

export const metadata = {
  title: 'Éditions - Journal du Syndiqué SUDCT62',
  description: 'Consultez toutes les éditions du journal syndical SUDCT62',
}

export default async function EditionsPage() {
  const editions = await getEditions();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Les Éditions</h1>
        <p className="text-lg text-gray-600">
          Consultez toutes les éditions de notre journal syndical
        </p>
      </div>

      {editions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {editions.map((edition) => (
            <EditionCard key={edition.id} edition={edition} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            Aucune édition disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  )
}