import { FooterSection, NavMenuList } from "@/types/client";

export const navMenuList: NavMenuList[] = [
  {
    id: 1,
    name: "News",
    link: "/news",
  },
  {
    id: 2,
    name: "Lists",
    link: "/lists",
  },
  {
    id: 3,
    name: "Life",
    link: "/life",
  },
  {
    id: 4,
    name: "Magazine",
    link: "/magazine",
  },
];

export const categoryMap = {
  news: [
    "World News",
    "Innovation",
    "Investing",
    "Billionaires",
    "Entrepreneurs",
    "Leadership",
  ],
  life: ["Wellness", "Travel", "Lifestyle", "Property", "Style", "Motors"],
  list: ["Top 10", "Must Read", "Editors Picks"],
  magazine: ["Cover Story", "Exclusive", "Breaking Today"],
};

export type CategoryMapKey = keyof typeof categoryMap;

export const footerSections: FooterSection[] = [
  {
    title: "Sections",
    links: [
      { label: "News", href: "/news" },
      { label: "list", href: "/list" },
      { label: "life", href: "/life" },
      { label: "magazine", href: "/magazine" }
    ],
  },
  {
    title: "Exlore",
    links: [
      { label: "Billionaires", href: "/category/billionaires" },
      { label: "entrepreneurs", href: "/category/entrepreneurs" },
      { label: "innovation", href: "/category/innovation" },
      { label: "leadership", href: "/category/leadership" },
      { label: "investing", href: "/category/investing" },
    ],
  },
];


// font-family: switzer, -apple-system, roboto, ubuntu, sans-serif;
// font-size: 16px;
// font-weight: 400;
// line-height: 26px;
// color: ;