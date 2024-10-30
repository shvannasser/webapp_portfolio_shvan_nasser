import useApi from "../hooks/useApi";
import GridProjects from "../components/Grid";
import MainIntro from "../components/MainIntro";
import { Project } from "../types/types";
import { URLS } from "../config";

export default function MainPage() {
  const { data: projects, isLoading, error } = useApi<Project[]>(URLS.projects);

  return (
    <section>
      <MainIntro />
      {isLoading && <p>Loading projects...</p>}
      {error && <p>Error fetching projects: {error}</p>}
      {!isLoading && !error && projects && <GridProjects projects={projects} />}
    </section>
  );
}
