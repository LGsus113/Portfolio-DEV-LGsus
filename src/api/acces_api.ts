import type { RepoTypes, GitHubEventTypes } from "@/type/type";

const token = import.meta.env.VITE_ACCES_TOKEN;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const UPDATE_INTERVAL = 60 * 1000; // 1 minuto

let cache = {
  repos: null as RepoTypes[] | null,
  lastUpdate: 0,
};

// Función para obtener eventos recientes
const fetchEvents = async (): Promise<GitHubEventTypes[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/LGsus113/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    if (!response.ok) throw new Error("Error al obtener eventos");
    return await response.json();
  } catch (error) {
    console.error("❌ Error obteniendo eventos:", error);
    return [];
  }
};

// Función para obtener los repositorios
const fetchRepos = async (): Promise<RepoTypes[]> => {
  try {
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) throw new Error("Error al obtener repositorios");
    const data: RepoTypes[] = await response.json();
    return data.filter(
      (repo) =>
        repo.visibility === "private" ||
        (repo.visibility === "public" && repo.topics?.includes("proyectos"))
    );
  } catch (error) {
    console.error("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};

// Función para verificar si hubo cambios en los repositorios
const checkForUpdates = async () => {
  const newRepos = await fetchRepos(); // Obtener la lista actualizada de repositorios

  if (!cache.repos) {
    console.log("🔄 No hay caché previa, almacenando datos iniciales...");
    cache.repos = newRepos;
    return true; // Forzar actualización inicial
  }

  const hasChanges = newRepos.some((newRepo) => {
    const cachedRepo = cache.repos?.find((r) => r.id === newRepo.id);
    return !cachedRepo || newRepo.pushed_at !== cachedRepo.pushed_at; // Comparar cambios
  });

  if (hasChanges) {
    console.log(
      "✅ Se detectaron cambios en los repositorios, actualizando caché..."
    );
    cache.repos = newRepos;
    return true;
  }

  console.log("⚠️ No se detectaron cambios en los repositorios.");
  return false;
};

// Función principal para obtener repositorios con caché en el servidor y detección de cambios
export const getCachedRepos = async (): Promise<RepoTypes[]> => {
  const now = Date.now();
  const needsUpdate = await checkForUpdates();

  if (!needsUpdate && cache.repos && now - cache.lastUpdate < CACHE_DURATION) {
    console.log("🟢 Usando caché.");
    return cache.repos;
  }

  console.log(
    "🔄 Caché expirada o se detectaron cambios, actualizando repos..."
  );
  const repos = await fetchRepos();
  cache.repos = repos;
  cache.lastUpdate = now;
  return repos;
};

// Establecer un intervalo para actualizar automáticamente los repositorios cada minuto
setInterval(async () => {
  console.log("🔄 Verificando cambios automáticamente...");
  await getCachedRepos();
}, UPDATE_INTERVAL);
