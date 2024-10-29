import { useEffect, useState } from "react";
import Project from "../features/projects/Project";
import type { Project as ProjectProp, ProjectReuse } from "../types/types";
import AddProjectForm from "../features/projects/components/AddProjectForm";
import UpdateProjectForm from "../features/projects/components/UpdateProjectForm";

type GridProps = {
  projects: ProjectProp[];
};

export default function GridProjects(props: GridProps) {
  const [projects, setProjects] = useState<ProjectProp[]>(props.projects ?? []);
  const [editingProject, setEditingProject] = useState<ProjectProp | null>(
    null
  );
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setProjects(props.projects);
  }, [props.projects]);

  const onAddProject = async (project: ProjectProp) => {
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

  const onUpdateProject = async (
    projectId: string,
    projectData: Partial<ProjectReuse>
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3999/api/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProject = await response.json();
      setProjects(
        projects.map((project) =>
          project.id === projectId ? updatedProject.project : project
        )
      );
      setEditingProject(null); // Close the form after updating
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const onDeleteProject = async (projectId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3999/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
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

  const onEditProject = (project: ProjectProp) => {
    setEditingProject(project); // Set the project to be edited
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setShowModal(false);
  };

  return (
    <section>
      <h2>Mine prosjekter</h2>
      <article id='projects'>
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <div key={project.id} className='projects-item'>
              <Project
                key={project.id}
                {...project}
                onDeleteProject={onDeleteProject}
                onEditProject={onEditProject}
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

      {showModal && (
        <UpdateProjectForm
          project={editingProject}
          onUpdateProject={onUpdateProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
    // <section>
    //   <h2>Mine prosjekter</h2>
    //   <article id='projects'>
    //     {currentProjects.length > 0 ? (
    //       currentProjects.map((project) => (
    //         <div key={project.id} className='projects-item'>
    //           <Project
    //             key={project.id}
    //             {...project}
    //             onUpdateProject={onUpdateProject}
    //             onDeleteProject={onDeleteProject}
    //           />
    //         </div>
    //       ))
    //     ) : (
    //       <p>No projects to display</p>
    //     )}
    //     <article id='pagination'>
    //       <button onClick={handlePreviousPage} disabled={currentPage === 1}>
    //         Previous
    //       </button>
    //       <span>
    //         Page: {currentPage} / {totalPages}
    //       </span>
    //       <button
    //         onClick={handleNextPage}
    //         disabled={currentPage === totalPages}
    //       >
    //         Next
    //       </button>
    //     </article>
    //   </article>

    //   <AddProjectForm onAddProject={onAddProject} />
    // </section>
  );
}
