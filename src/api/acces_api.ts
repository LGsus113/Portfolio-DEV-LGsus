const token = import.meta.env.VITE_ACCES_TOKEN;

type Repo = {
  id: number;
  name: string;
  full_name: string;
  updated_at: string;
  html_url: string;
  created_at: string;
  pushed_at: string;
  description: string | null;
  language: string | null;
  visibility: string;
  topics?: string[];
};

export const fetchRepos = async (): Promise<Repo[]> => {
  try {
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Cache-Control": "no-cache",
      },
    });

    const data: Repo[] = await response.json();

    return data.filter(
      (repo) =>
        repo.visibility === "private" ||
        (repo.visibility === "public" &&
          repo.topics &&
          repo.topics.includes("proyectos"))
    );
  } catch (error) {
    console.error("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};
