import { NavMenuList } from "@/types/client/index.types";

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
