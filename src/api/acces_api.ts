const token = import.meta.env.VITE_ACCES_TOKEN;
const POLLING_INTERVAL = 1 * 60 * 1000; // 1 minuto

// Tipo de datos para los repositorios
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

let abortController = new AbortController();

const fetchAndFilterRepos = async (): Promise<Repo[]> => {
  try {
    abortController.abort();
    abortController = new AbortController();

    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      signal: abortController.signal, // Asociar la señal para cancelación
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los repositorios: ${response.status}`);
    }

    const data: Repo[] = await response.json();

    return data.filter(
      (repo) =>
        repo.visibility === "private" ||
        (repo.visibility === "public" &&
          repo.topics &&
          repo.topics.includes("proyectos"))
    );
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      console.warn("⚠️ Solicitud de repositorios cancelada.");
      return [];
    }
    console.error("❌ Error obteniendo los datos del repositorio:", error);
    return [];
  }
};

export const getRepos = async (): Promise<Repo[]> => {
  console.log("🚀 Obteniendo datos actualizados desde GitHub...");
  return await fetchAndFilterRepos();
};

const startPolling = () => {
  setInterval(async () => {
    console.log("🔄 Verificando cambios en GitHub...");
    await getRepos();
  }, POLLING_INTERVAL);
};

startPolling();
