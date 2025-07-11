import ArticleCard from './ArticleCard';
import LoadingSkeleton from './LoadingSkeleton';

const NewsList = ({ articles, isLoading }) => {
  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Empty state
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No articles found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <ArticleCard 
          key={article.url || article.title}
          article={article} 
        />
      ))}
    </div>
  );
};

export default NewsList;