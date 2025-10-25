# Journal du Syndiqué SUDCT62 📰

![App Preview](https://imgix.cosmicjs.com/94fe55c0-b1ad-11f0-a808-31b5d2a33ba3-photo-1504711434969-e33886168f5c-1761401953227.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern digital publication platform for the SUDCT62 union journal, built with Next.js 15 and Cosmic CMS. Features edition management, article publishing, and category organization for union communications.

## ✨ Features

- **📚 Edition Management** - Showcase complete journal editions with cover images and publication details
- **📰 Article Publishing** - Display articles with markdown rendering, featured images, and author attribution
- **🏷️ Category System** - Organize content with color-coded categories (Actualités, Droits des Travailleurs, Vie Syndicale)
- **🎨 Professional Design** - Clean, accessible design with French labor union aesthetics
- **📱 Responsive Layout** - Mobile-first approach for accessibility on all devices
- **🖼️ Image Optimization** - Automatic image optimization via imgix
- **🔍 SEO Ready** - Proper meta tags and structured content for search engines

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fcdb4592c9229c30fe5edc&clone_repository=68fcdd3592c9229c30fe5f39)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "cree logiciel html,css et js"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown content rendering
- **Inter Font** - Modern typography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your bucket already set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Editions with Articles

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all editions with nested article data
const { objects: editions } = await cosmic.objects
  .find({ type: 'editions' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes nested articles

// Sort by edition number
editions.sort((a, b) => 
  (b.metadata.edition_number || 0) - (a.metadata.edition_number || 0)
)
```

### Fetching Articles by Category

```typescript
// Get articles filtered by category
const { objects: articles } = await cosmic.objects
  .find({ 
    type: 'articles',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes category data
```

### Fetching Single Article

```typescript
// Get a specific article by slug
const { object: article } = await cosmic.objects
  .findOne({
    type: 'articles',
    slug: articleSlug
  })
  .depth(1) // Includes category relationship
```

## 🎨 Cosmic CMS Integration

This application uses the following Cosmic object types:

### Éditions
- **edition_number** (number) - Edition number
- **publication_date** (date) - Publication date
- **main_title** (text) - Main title
- **subtitle** (text) - Subtitle
- **location** (text) - Publication location
- **articles** (objects) - Related articles
- **cover_image** (file) - Cover image

### Articles
- **article_title** (text) - Article title
- **content** (markdown) - Article content
- **author** (text) - Author name
- **category** (object) - Related category
- **featured_image** (file) - Featured image
- **publish_date** (date) - Publication date

### Catégories
- **name** (text) - Category name
- **description** (textarea) - Category description
- **color** (color) - Category color

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

## 📝 License

MIT License - feel free to use this project for your own union publications!

<!-- README_END -->