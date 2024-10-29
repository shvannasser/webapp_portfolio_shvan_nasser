import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Project } from "../../../types/types";

type AddProjectFormProps = {
  onAddProject: (project: Project) => Promise<void>;
  onUpdateProject: (
    projectId: string,
    projectData: Partial<Project>
  ) => Promise<void>;
  editingProject: Project | null; // Prop for the project being edited
  onClose: () => void; // Prop to close the form
};

const AddProjectForm: React.FC<AddProjectFormProps> = ({
  onAddProject,
  onUpdateProject,
  editingProject,
  onClose,
}) => {
  const [project, setProject] = useState<Project>({
    id: "",
    title: "",
    isPublic: false,
    status: false,
    image: "",
    description: "",
    createdAt: format(new Date(), "yyyy-MM-dd"),
    publishedAt: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    if (editingProject) {
      setProject(editingProject); // Pre-fill the form with the current project data
    } else {
      setProject({
        id: "",
        title: "",
        isPublic: false,
        status: false,
        image: "",
        description: "",
        createdAt: format(new Date(), "yyyy-MM-dd"),
        publishedAt: format(new Date(), "yyyy-MM-dd"),
      });
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      await onUpdateProject(editingProject.id, project);
    } else {
      await onAddProject(project);
    }
    setProject({
      id: "",
      title: "",
      isPublic: false,
      status: false,
      image: "",
      description: "",
      createdAt: format(new Date(), "yyyy-MM-dd"),
      publishedAt: format(new Date(), "yyyy-MM-dd"),
    });
    onClose(); // Close the form after submission
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className='projectForm'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Enter project title'
            id='title'
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />

          <label htmlFor='public'>Public</label>
          <input
            type='checkbox'
            id='public'
            checked={project.isPublic}
            onChange={(e) =>
              setProject({ ...project, isPublic: e.target.checked })
            }
          />

          <label htmlFor='status'>Status</label>
          <input
            type='checkbox'
            id='status'
            checked={project.status}
            onChange={(e) =>
              setProject({ ...project, status: e.target.checked })
            }
          />

          <label htmlFor='image'>Project Image URL</label>
          <input
            type='text'
            id='image'
            value={project.image}
            onChange={(e) => setProject({ ...project, image: e.target.value })}
          />

          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />

          <button type='submit'>
            {editingProject ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
