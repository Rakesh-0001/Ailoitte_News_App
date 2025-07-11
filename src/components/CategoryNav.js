"use client";

import Link from "next/link";
import { CATEGORIES } from "@/utils/constants";

const CategoryNav = ({ currentCategory }) => {
  return (
    <div className="flex overflow-x-auto  mb-6 scrollbar-hide">
      <div className="flex space-x-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              currentCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;