import { useState } from "react";
import { format } from "date-fns";

type AddProjectFormProps = {
  onAddProject: (project: {
    title: string;
    tags: string[];
    isPublic: boolean;
    publishedAt: string;
    image: string;
    description: string;
  }) => void;
};

// {title}: {title: string}, {description}: {description: string}) => void}

export default function AddProjectForm(props: AddProjectFormProps) {
  const { onAddProject } = props;
  const [project, setProject] = useState({
    title: "",
    tags: [] as string[],
    publishedAt: format(new Date(), "yyyy-MM-dd"),
    isPublic: false,
    image: "",
    description: "",
  });

  const [show, setShow] = useState(false);

  const showProjects = () => {
    setShow(!show);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const tags = input.split(" ");

    setProject({ ...project, tags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.title || !project.description)
      return alert(
        `Please fill out title and description fields before submitting`
      );
    onAddProject(project);
  };

  return (
    <section className='formContainer'>
      <button
        onClick={showProjects}
        // Gjør at vi kan velge mellom to forskjellige klasser basert på state til show mtp CSS.
        // forskjell mellom ? og ?? er at ?? sjekker om det er null eller undefined mens ? sjekker om det er true eller false.
        className={show ? "close-form-button" : "show-form-button"}
      >
        {show ? "Close form" : "Create a new project"}
      </button>{" "}
      {show && (
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
          <label htmlFor='tags'>Tags</label>
          <input
            type='text'
            placeholder='Enter project tags'
            id='tags'
            value={project.tags}
            onChange={handleTagsChange}
          />
          <label htmlFor='public'>Public</label>
          <input
            type='checkbox'
            id='public'
            value={project.isPublic ? "true" : "false"}
            onChange={(e) =>
              setProject({ ...project, isPublic: e.target.checked })
            }
          />
          {/* <label htmlFor='publishedAt'>Published at</label>
          <input
            type='text'
            placeholder='Enter project published at'
            id='publishedAt'
            value={project.publishedAt}
            onChange={(e) =>
              setProject({ ...project, publishedAt: e.target.value })
            }
          /> */}
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
      )}
    </section>
  );
}
