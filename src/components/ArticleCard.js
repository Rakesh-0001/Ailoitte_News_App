import Link from "next/link";
import Image from "next/image";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>{article.source?.name}</span>
        </div>
        <Link
          href={`/articles/${encodeURIComponent(article.title)}`}
          className="mt-3 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
