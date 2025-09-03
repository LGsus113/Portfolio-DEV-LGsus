import { getCollection } from "astro:content";
import { getCachedRepos } from "@/api/acces_api";
import { formatYears } from "@/type-script/Format-Time";
import type { ExperienceProps, GroupedExperience } from "@/type-script/type";

function groupByBadge(experiences: ExperienceProps[]): GroupedExperience[] {
  const map = new Map<string, ExperienceProps[]>();

  for (const exp of experiences) {
    if (!map.has(exp.badge)) {
      map.set(exp.badge, []);
    }
    map.get(exp.badge)!.push(exp);
  }

  return Array.from(map.entries()).map(([badge, items]) => ({
    badge,
    items,
  }));
}

export async function getDeveloperExperiencesGrouped(): Promise<
  GroupedExperience[]
> {
  const repos = await getCachedRepos();

  const experiences: ExperienceProps[] = repos.map((res) => {
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

  return groupByBadge(experiences);
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
