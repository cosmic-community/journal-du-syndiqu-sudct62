// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Article interface
export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    article_title: string;
    content: string;
    author?: string;
    category?: Category;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    publish_date?: string;
  };
}

// Edition interface
export interface Edition extends CosmicObject {
  type: 'editions';
  metadata: {
    edition_number: number;
    publication_date: string;
    main_title: string;
    subtitle?: string;
    location?: string;
    articles?: Article[];
    cover_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}