"use client";

import React from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export function CategoriesPreview() {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-16 w-full bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-12 flex items-center gap-4">
          <span className="h-12 w-1.5 bg-gradient-to-b from-green-500 to-green-700 rounded-sm"></span>
          <span>
            Shop by{" "}
            <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Category
            </span>
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500">
              No categories found.
            </div>
          ) : (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug}`}
                className="group block bg-white p-6 rounded-2xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-gray-50"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="mx-auto mb-4 h-20 w-20 object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
                <h3 className="font-semibold text-gray-800 text-lg transition-colors duration-300 group-hover:text-black">
                  {category.name}
                </h3>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

