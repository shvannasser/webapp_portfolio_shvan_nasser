import { useState } from "react";

type AddProjectFormProps = {
  onAddProject: (project: {
    title: string;
    image: string;
    description: string;
  }) => void;
};

// {title}: {title: string}, {description}: {description: string}) => void}

export default function AddProjectForm(props: AddProjectFormProps) {
  const { onAddProject } = props;
  const [project, setProject] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.title || !project.description)
      return alert("Please fill out {title} and {description}");
    onAddProject(project);
  };

  return (
    <section className='formContainer'>
      <form onSubmit={handleSubmit} className='projectForm'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          placeholder='Enter project title'
          id='title'
          value={project.title}
          // onChange = {handleChange}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <label htmlFor='image'>Image</label>
        <input
          type='text'
          placeholder='Enter project image'
          id='image'
          value={project.image}
          onChange={(e) => setProject({ ...project, image: e.target.value })}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          placeholder='Enter project description'
          id='description'
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <button type='submit'>Add Project</button>
      </form>
    </section>
  );
}
