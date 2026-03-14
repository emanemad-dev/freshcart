"use client";

import { use } from "react";
import { Subcategories } from "../Subcategories";

interface SubcategoriesPageProps {
  params: Promise<{ id: string }>;
}

export default function SubcategoriesPage({ params }: SubcategoriesPageProps) {
  const { id } = use(params);

  return <Subcategories categoryId={id} />;
}
