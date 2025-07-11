"use client";

import { useState, useEffect } from 'react';
import {
  getTopHeadlines,
  getNewsByCategory,
  searchNews,
} from "@/utils/newsApi";
import { CATEGORIES, PAGE_SIZE } from "@/utils/constants";
import CategoryNav from "@/components/CategoryNav";
import SearchBar from "@/components/SearchBar";
import NewsList from "@/components/NewsList";
import Pagination from "@/components/Pagination";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { useSearchParams } from 'next/navigation';
import "../app/globals.css";

export default function Home() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get('page')) || 1;
  const category = searchParams?.get('category') || "general";
  const searchQuery = searchParams?.get('q');

  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery) {
        data = await searchNews(searchQuery, page, PAGE_SIZE);
      } else {
        data = await getNewsByCategory(category, page, PAGE_SIZE);
      }
      setNewsData(data);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message || "Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, category, searchQuery]);

  const totalPages = Math.ceil((newsData?.totalResults || 0) / PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <CategoryNav currentCategory={category} />
      
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <NewsList articles={newsData?.articles} />
          {newsData?.articles?.length > 0 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
}