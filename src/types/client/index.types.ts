import React, { Dispatch, SetStateAction } from "react";



export interface INavLink {
  name: string;
  link: string;
  setIsOpen: Dispatch<SetStateAction <boolean>>
}

export interface NavMenuList {
    id: number;
    name: string;
    link: string
}


export interface ISideBar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction <boolean>>
}

export interface SocialLink {
  id: number;
  icon: React.ReactNode; // অথবা JSX.Element ব্যবহার করতে পারেন
  link: string;
}



export interface Tab {
  name: string;
  href: string;
}

export interface PageTabsProps {
  tabs: Tab[];
}


export interface PaginationPageProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}