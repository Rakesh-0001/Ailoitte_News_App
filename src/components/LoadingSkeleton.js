import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// components/LoadingSkeleton.js

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl font-medium text-gray-500">
        Loading news articles...
      </div>
    </div>
  );
};
export default LoadingSkeleton;
