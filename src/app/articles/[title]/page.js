import { notFound } from "next/navigation";
import { getTopHeadlines, searchNews } from "@/utils/newsApi";
import Image from "next/image";


// Cache the initial headlines to help with matching
let cachedArticles = [];

export async function generateStaticParams() {
  try {
    const data = await getTopHeadlines();
    cachedArticles = data.articles; // Store for later use
    return data.articles.map(article => ({
      title: encodeURIComponent(article.title),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getArticleByTitle(title) {
  try {
    const decodedTitle = decodeURIComponent(title);
    
    // First check our cached articles
    const cachedMatch = cachedArticles.find(
      article => encodeURIComponent(article.title) === title
    );
    if (cachedMatch) return cachedMatch;

    // If not found in cache, try searching
    const searchData = await searchNews(decodedTitle, 1, 5);
    
    if (searchData.articles.length > 0) {
      // Find the closest title match
      const match = searchData.articles.find(article => 
        article.title.toLowerCase().includes(decodedTitle.toLowerCase()) ||
        decodedTitle.toLowerCase().includes(article.title.toLowerCase())
      );
      return match || searchData.articles[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticleByTitle(params.title);
  
  if (!article) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div className="relative h-48 w-full">

        
        <Image
          src={article.urlToImage || "/placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="flex justify-between items-center mb-6 mt-px-5 text-gray-600">
        <span>{article.source?.name}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>

      <div className="prose max-w-none">
        <p className="text-lg mb-4">{article.description}</p>
        <p className="whitespace-pre-line">
          {article.content || "No content available"}
        </p>
      </div>

      <div className="mt-8">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read full article on {article.source?.name}
        </a>
      </div>
    </div>
  );
}
