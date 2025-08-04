/* eslint-disable @typescript-eslint/no-explicit-any */

export const getNews = async (params = {}) => {
  const domain = process.env.NEXT_PUBLIC_BASE_URL;

  // Base URL for your API
  const apiPath = `/api/news/allNews`;

  // Creates a query string like "?priority=isBreaking&page=1" from the params object
  const queryString = new URLSearchParams(params).toString();

  // Combines the base URL and the query string
  const url = `${domain}${apiPath}?${queryString}`;

  const res = await fetch(url, {
    next: { tags: ["news-list"] },
  });

  // Basic error handling
  if (!res.ok) {
    console.error(`Failed to fetch news from ${url}: ${res.statusText}`);
    return []; // Return an empty array on error
  }

  const { data } = await res.json();
  return data; // Return data or an empty array if data is null/undefined
};

import { News } from "@/models/news.models";
import "@/models/users.models";
import { connectDB } from "@/utils/connectDB";

// এই ফাংশনটি ডাটাবেস থেকে সরাসরি ডেটা নিয়ে আসবে
export const findNewsFromDb = async (params: any = {}) => {
  try {
    // ডাটাবেসের সাথে সংযোগ স্থাপন করুন
    await connectDB();

    // params অবজেক্ট থেকে বিভিন্ন শর্ত নিন
    const {
      priority,
      newsType,
      category,
      page = 1,
      limit = 10, // ডিফল্টভাবে ১০টি আইটেম
    } = params;

    // Mongoose কোয়েরি অবজেক্ট তৈরি করুন
    const query: any = {};
    if (priority && priority !== "none") query.priority = priority;
    if (newsType) query.newsType = newsType;
    if (category) query.category = category;

    // ডাটাবেস থেকে ডেটা খুঁজুন, সর্ট করুন এবং পেজিনেশন করুন
    const news = await News.find(query)
      .populate("author") // Author-এর তথ্যও সাথে নিয়ে আসবে
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Mongoose document-কে প্লেইন অবজেক্টে রূপান্তর করা একটি ভালো অভ্যাস,
    // এটি সার্ভার কম্পোনেন্টে ডেটা পাস করার সময় এরর থেকে বাঁচায়।
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Database query failed in findNewsFromDb:", error);
    return []; // কোনো এরর হলে খালি অ্যারে রিটার্ন করুন
  }
};
