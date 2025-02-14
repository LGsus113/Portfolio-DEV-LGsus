const token = import.meta.env.VITE_ACCES_TOKEN;
const GITHUB_USERNAME = "LGsus113";

let cachedRepos: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora
const POLLING_INTERVAL = 1 * 60 * 1000; // 1 minuto

// Función para obtener los repositorios filtrados
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

const fetchAndFilterRepos = async (): Promise<Repo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/user/repos?timestamp=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const data: Repo[] = await response.json();

    const filteredRepos = data
      .filter(
        (repo) =>
          repo.visibility === "private" ||
          (repo.visibility === "public" &&
            repo.topics &&
            repo.topics.includes("proyectos"))
      )
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        updated_at: repo.updated_at,
        html_url: repo.html_url, // Mantén el mismo nombre
        created_at: repo.created_at, // Mantén el mismo nombre
        pushed_at: repo.pushed_at, // Mantén el mismo nombre
        description: repo.description, // Mantén el mismo nombre
        language: repo.language, // Mantén el mismo nombre
        visibility: repo.visibility,
        topics: repo.topics, // Asegúrate de incluir esto si lo necesitas
      }));

    cachedRepos = filteredRepos;
    lastFetchTime = Date.now();
    console.log("🔄 Datos actualizados desde GitHub.");
    return filteredRepos;
  } catch (error) {
    console.error("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};

// Función para verificar si hay cambios recientes en los repositorios
const hasRecentChanges = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const repos: Repo[] = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) return false;

    return repos.some(
      (repo) => new Date(repo.updated_at).getTime() > lastFetchTime
    );
  } catch (error) {
    console.error("❌ Error verificando actividad reciente:", error);
    return false;
  }
};

// Función principal para obtener los repositorios
export const getRepos = async (forceUpdate = false): Promise<Repo[]> => {
  if (
    forceUpdate ||
    !cachedRepos ||
    Date.now() - lastFetchTime > CACHE_DURATION
  ) {
    console.log("🚀 Forzando actualización de datos...");
    return await fetchAndFilterRepos();
  }

  if (await hasRecentChanges()) {
    console.log("🚀 Se detectaron cambios en GitHub. Actualizando datos...");
    return await fetchAndFilterRepos();
  }

  console.log("✅ Usando caché de GitHub.");
  return cachedRepos;
};

// Iniciar polling automático
const startPolling = () => {
  setInterval(async () => {
    console.log("🔄 Verificando cambios en GitHub...");
    await getRepos();
  }, POLLING_INTERVAL);
};

startPolling();
