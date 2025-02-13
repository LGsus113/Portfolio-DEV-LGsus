const token = import.meta.env.VITE_ACCES_TOKEN;

let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

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

    return filteredRepos;
  } catch (error) {
    console.log(
      "Error obteniendo los datos del repositorio, la traza es: ",
      error
    );
    return [];
  }
};

export const getRepos = async () => {
  const currentTime = Date.now();

  if (cachedRepos && currentTime - lastFetchTime < CACHE_DURATION) {
    console.log("✅ Using cached GitHub data");
    return cachedRepos;
  }

  return await fetchAndFilterRepos();
};
