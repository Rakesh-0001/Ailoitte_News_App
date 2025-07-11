'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Pagination = ({ currentPage, totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'general';
  const searchQuery = searchParams.get('q');

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;