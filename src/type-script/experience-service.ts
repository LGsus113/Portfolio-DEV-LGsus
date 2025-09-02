import { getCollection } from "astro:content";
import { getCachedRepos } from "@/api/acces_api";
import { formatYears } from "@/type-script/Format-Time";
import type { ExperienceProps } from "@/type-script/type";

export async function getDeveloperExperiences(): Promise<ExperienceProps[]> {
  const repos = await getCachedRepos();

  return repos.map((res) => {
    const startDate = res.created_at;
    const endDate = res.pushed_at || null;
    const date = formatYears(startDate, endDate);

    return {
      title: res.name || "Título no disponible",
      date,
      description: res.description || "Descripción no disponible",
      download: res.html_url || "",
      badge: res.language ? `latest ${res.language}` : "Sin destacados",
    };
  });
}

export async function getOtherExperiences(
  type: string
): Promise<ExperienceProps[]> {
  const experiences = await getCollection("experiences");

  return experiences
    .filter(({ data }) => data.type === type)
    .map(({ data }) => ({
      title: data.title,
      date: data.date,
      description: data.description,
      download: data.download || "",
      badge: data.badge,
    }));
}
