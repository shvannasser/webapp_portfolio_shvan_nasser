import { useEffect, useState } from "react";
import Project from "../features/projects/Project";
import type { Project as ProjectProp } from "../types/types";
import AddProjectForm from "../features/projects/components/AddProjectForm";

type GridProps = {
  projects: ProjectProp[];
};

export default function GridProjects(props: GridProps) {
  const [projects, setProjects] = useState<ProjectProp[]>(props.projects ?? []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setProjects(props.projects);
  }, [props.projects]);

  const onAddProject = async (project: {
    title: string;
    image: string;
    description: string;
  }) => {
    try {
      const response = await fetch("http://localhost:3999/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      setProjects((prevProjects) => [...prevProjects, data.project]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Regner ut hvilke prosjekter som skal vises basert på nåværende side
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  // Regner ut total nummer av sider
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Event handler for å kunne gå til forrige side
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Event handler for å kunne gå til neste side
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section>
      <h2>Mine prosjekter</h2>
      <article id='projects'>
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <div key={project.id} className='projects-item'>
              <Project
                id={project.id}
                title={project.title}
                image={project.image}
                description={project.description}
              />
            </div>
          ))
        ) : (
          <p>No projects to display</p>
        )}
        <article id='pagination'>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page: {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </article>
      </article>

      <AddProjectForm onAddProject={onAddProject} />
    </section>
  );
}
