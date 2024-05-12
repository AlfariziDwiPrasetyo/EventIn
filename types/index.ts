import { Icons } from "@/components/Icons";

export interface navItem {
  title: string;
  link: string;
  icon: keyof typeof Icons;
}

export interface allNavItem extends navItem {
  items: allNavItem[];
}
