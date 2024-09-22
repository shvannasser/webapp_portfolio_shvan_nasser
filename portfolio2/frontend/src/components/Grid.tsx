import { useState } from "react";
import Project from "./Project";
import type { Project as ProjectProp } from "./types";
import AddProjectForm from "./AddProjectForm";

type GridProps = {
  projects: ProjectProp[];
};

export default function GridProjects(props: GridProps) {
  const [projects, setProjects] = useState<ProjectProp[]>(props.projects ?? []);

  const onAddProject = (project: { title: string; description: string }) => {
    setProjects((prev) => [...prev, { id: crypto.randomUUID(), ...project }]);
  };

  return (
    <section>
      <h2>Mine prosjekter</h2>
      <article id='projects'>
        {projects.map((project) => (
          <div key={project.id} className='projects-item'>
            <Project
              id={project.id}
              title={project.title}
              description={project.description}
            />
          </div>
        ))}
      </article>
      <AddProjectForm onAddProject={onAddProject} />
    </section>
  );
}
