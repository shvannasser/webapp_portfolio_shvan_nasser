import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Project as ProjectType } from "../../../types/types";

type UpdateProjectFormProps = {
  project: ProjectType | null;
  onUpdateProject: (
    projectId: string,
    projectData: Partial<ProjectType>
  ) => Promise<void>;
  onClose: () => void;
};

export default function UpdateProjectForm(props: UpdateProjectFormProps) {
  const { project, onUpdateProject, onClose } = props;
  const [editableProject, setEditableProject] = useState<ProjectType>({
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
    if (project) {
      setEditableProject({
        ...project,
        image: project.image || "", // Provide a default value for image if undefined
      });
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setEditableProject({
      ...editableProject,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProject(editableProject.id, editableProject);
    onClose(); // Close the form after updating
  };

  if (!project) return null; // Don't render the form if no project is selected

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
            name='title'
            value={editableProject.title}
            onChange={handleChange}
          />
          <div className='public-status-checkBox'>
            <label htmlFor='public'>Public</label>
            <input
              type='checkbox'
              id='public'
              name='isPublic'
              checked={editableProject.isPublic}
              onChange={handleChange}
            />
            <label htmlFor='status'>Status</label>
            <input
              type='checkbox'
              id='status'
              name='status'
              checked={editableProject.status}
              onChange={handleChange}
            />{" "}
          </div>

          <label htmlFor='image'>Project Image URL</label>
          <input
            type='text'
            id='image'
            name='image'
            value={editableProject.image}
            onChange={handleChange}
          />

          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={editableProject.description}
            onChange={handleChange}
          />

          <button type='submit'>Update Project</button>
        </form>
      </div>
    </div>
  );
}
