const token = import.meta.env.VITE_ACCES_TOKEN;
const GITHUB_USERNAME = "LGsus113";

let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const actividadReciente = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) {
      console.log("❌ No hay eventos recientes.");
      return false;
    }

    const lastEventTime = new Date(events[0].created_at).getTime();
    console.log("✅ Último evento en GitHub:", new Date(lastEventTime));

    return lastEventTime > lastFetchTime;
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
    lastFetchTime = Date.now(); // ✅ Aseguramos que el caché refleje el nuevo fetch

    console.log("🔄 Datos actualizados desde GitHub.");

    return filteredRepos;
  } catch (error) {
    console.log("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};

export const getRepos = async () => {
  const currentTime = Date.now();

  // 🚀 Verificamos si hay eventos recientes antes de usar el caché
  const hasUpdates = await actividadReciente();
  if (hasUpdates) {
    console.log("🚀 Se detectaron cambios en GitHub. Actualizando datos...");
    return await fetchAndFilterRepos();
  }

  // ✅ Si no hay cambios recientes, verificamos el tiempo de caché
  if (cachedRepos && currentTime - lastFetchTime < CACHE_DURATION) {
    console.log("✅ Usando caché de GitHub...");
    return cachedRepos;
  }

  console.log("🔄 Caché vencido o no disponible. Obteniendo nuevos datos...");
  return await fetchAndFilterRepos();
};
