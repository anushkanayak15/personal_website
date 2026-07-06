import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { getAllPosts } from "@/lib/writing";
import { SITE_URL as BASE_URL } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/research", "/experience", "/writing", "/contact"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  const writingRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...productRoutes, ...writingRoutes];
}
