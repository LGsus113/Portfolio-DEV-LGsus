const token = import.meta.env.VITE_ACCES_TOKEN;

export const getRepos = async () => {
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

    return filteredRepos;
  } catch (error) {
    console.log(
      "Error obteniendo los datos del repositorio, la traza es: ",
      error
    );
    return [];
  }
};
