import { LuGithub, LuLinkedin, LuMail, LuTwitter } from "react-icons/lu";
import type { IconType } from "react-icons";
import { siteConfig } from "./site";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
  handle: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: LuGithub,
    handle: "@Deyvid0932",
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LuLinkedin,
    handle: "/in/deyvid-jair-chupillon-silva",
  },
  {
    label: "Correo",
    href: siteConfig.gmailUrl,
    icon: LuMail,
    handle: siteConfig.email,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: LuTwitter,
    handle: "@deyvid",
  },
];
