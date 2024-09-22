import { useEffect, useState } from "react";
import Project from "./Project";
import type { Project as ProjectProp } from "./types";
import AddProjectForm from "./AddProjectForm";

type GridProps = {
  projects: ProjectProp[];
};

export default function GridProjects(props: GridProps) {
  const [projects, setProjects] = useState<ProjectProp[]>(props.projects ?? []);

  useEffect(() => {
    setProjects(props.projects);
  }, [props.projects]);

  const onAddProject = async (project: {
    title: string;
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
      setProjects(data);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <section>
      <h2>Mine prosjekter</h2>
      <article id='projects'>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className='projects-item'>
              <Project
                id={project.id}
                title={project.title}
                description={project.description}
              />
            </div>
          ))
        ) : (
          <p>No projects to display</p>
        )}
      </article>
      <AddProjectForm onAddProject={onAddProject} />
    </section>
  );
}
