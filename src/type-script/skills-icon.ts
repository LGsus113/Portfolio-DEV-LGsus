import type { SkillWithIcon } from "@/type-script/type";
import { skills } from "@cv";
import AstroIcon from "@/icons/astroIcon.astro";
import TailwindIcon from "@/icons/tailwind.astro";
import JSIcon from "@/icons/js.astro";
import React from "@/icons/react.astro";
import HTMLIcon from "@/icons/HTMLIcon.astro";
import CSSIcon from "@/icons/css.astro";
import Java from "@/icons/java.astro";
import SpringBoot from "@/icons/springBoot.astro";
import SQLServer from "@/icons/sqlServerIcon.astro";
import MySQL from "@/icons/MySQLIcon.astro";
import MongoDB from "@/icons/mongoDb.astro";

export const skillIcons: Record<string, any> = {
  HTML: HTMLIcon,
  CSS: CSSIcon,
  TailwindCss: TailwindIcon,
  JavaScript: JSIcon,
  React: React,
  Astro: AstroIcon,
  Java: Java,
  SpringBoot: SpringBoot,
  "SQL Server": SQLServer,
  MySQL: MySQL,
  MongoDB: MongoDB,
};

export function getSkillWithIcons(): SkillWithIcon[] {
  return skills.map((skill) => {
    const Icon = skillIcons[skill.name] || null;
    return { ...skill, Icon };
  });
}
