const token = import.meta.env.VITE_ACCES_TOKEN;
const GITHUB_USERNAME = "LGsus113";

let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000;
const POLLING_INTERVAL = 1 * 60 * 1000;

const actividadReciente = async () => {
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

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      console.log("❌ No se encontraron repositorios.");
      return false;
    }

    const hasRecentChanges = repos.some(
      (repo) => new Date(repo.updated_at).getTime() > lastFetchTime
    );

    if (hasRecentChanges) {
      console.log("✅ Se detectaron cambios recientes en los repositorios.");
      return true;
    }

    console.log("❌ No hay cambios recientes en los repositorios.");
    return false;
  } catch (error) {
    console.log("❌ Error verificando actividad reciente:", error);
    return false;
  }
};

const fetchAndFilterRepos = async () => {
  try {
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const data = await response.json();

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
        position: repo.updated_at,
        url: repo.html_url,
        startDate: repo.created_at,
        endDate: repo.pushed_at,
        summary: repo.description,
        highlights: repo.language,
        visibility: repo.visibility,
      }));

    cachedRepos = filteredRepos;
    lastFetchTime = Date.now();

    console.log("🔄 Datos actualizados desde GitHub.");
    return filteredRepos;
  } catch (error) {
    console.log("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};

export const getRepos = async (forceUpdate = false) => {
  const currentTime = Date.now();

  if (
    forceUpdate ||
    !cachedRepos ||
    currentTime - lastFetchTime > CACHE_DURATION
  ) {
    console.log("🚀 Forzando actualización de datos...");
    const repos = await fetchAndFilterRepos();
    lastFetchTime = Date.now();
    return repos;
  }

  const hasUpdates = await actividadReciente();

  if (hasUpdates) {
    console.log("🚀 Se detectaron cambios en GitHub. Actualizando datos...");
    const repos = await fetchAndFilterRepos();
    lastFetchTime = Date.now();
    return repos;
  }

  console.log("✅ Usando caché de GitHub.");
  return cachedRepos;
};

const startPolling = () => {
  setInterval(async () => {
    console.log("🔄 Verificando cambios en GitHub...");
    await getRepos();
  }, POLLING_INTERVAL);
};

startPolling();
