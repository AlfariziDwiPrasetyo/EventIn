"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ICategory } from "@/lib/database/models/category.model";
import { getAllCategories } from "@/lib/actions/category.actions";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [defaultCategory, setDefaultCategory] = useState<string>("All");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    if (defaultCategory == "All") {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });

      router.push(newUrl, { scroll: false });
    }

    getCategories();
  }, []);

  const onSelectCategories = (categories: string) => {
    setDefaultCategory(categories);
    let newUrl = "";
    if (categories && categories !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: categories,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategories(value)}>
      <SelectTrigger className="min-h-[54px] w-full overflow-hidden bg-grey-50 px-4 py-2 border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md text-grey-500">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="bg-grey-50">
          All Category
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="bg-grey-50"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
