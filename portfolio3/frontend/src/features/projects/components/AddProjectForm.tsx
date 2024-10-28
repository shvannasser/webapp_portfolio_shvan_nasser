import { useState } from "react";
import { format } from "date-fns";
import { Collaborator, Tag } from "../../../types/types";

type AddProjectFormProps = {
  onAddProject: (project: {
    title: string;
    isPublic: boolean;
    status: boolean;
    publishedAt: string;
    authorId: string;
    authorName: string;
    image: string;
    description: string;
    tags: Tag[];
    collaborators: Collaborator[];
  }) => void;
};

// {title}: {title: string}, {description}: {description: string}) => void}

export default function AddProjectForm(props: AddProjectFormProps) {
  const { onAddProject } = props;
  const [project, setProject] = useState({
    title: "",
    publishedAt: format(new Date(), "yyyy-MM-dd"),
    isPublic: false,
    status: false,
    authorName: "",
    authorId: "",
    image: "",
    description: "",
    collaborators: [] as Collaborator[],
    tags: [] as Tag[],
  });

  const [show, setShow] = useState(false);

  const showProjects = () => {
    setShow(!show);
  };

  // const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;
  //   let tags = input.split(" ");

  //   setProject({ ...project, tags });
  // };
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const tags = input.split(",").map((tag) => ({
      id: tag.trim().toLowerCase().replace(/\s+/g, ""), // Convert to lowercase and remove spaces
      name: tag.trim(),
    }));

    setProject({ ...project, tags });
  };

  const handleCollaboratorsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    const collaborators = input.split(" ").map((collaborator) => ({
      user: { id: collaborator, name: collaborator },
      createdAt: new Date().toISOString(),
    }));

    setProject({ ...project, collaborators });
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
          <label htmlFor='tags'>Project Tags</label>
          <input
            type='text'
            placeholder='Enter project tags separated by commas'
            id='tags'
            value={project.tags.map((tag) => tag.name).join(", ")}
            onChange={handleTagsChange}
          />
          <label htmlFor='authorName'>Author Name</label>
          <input
            type='text'
            placeholder='Enter author name'
            id='authorName'
            value={project.authorName}
            onChange={(e) =>
              setProject({ ...project, authorName: e.target.value })
            }
          />
          {/* <label htmlFor='authorId'>Author Id</label>
          <input
            type='text'
            placeholder='Enter author id'
            id='authorId'
            value={project.authorId}
            onChange={(e) =>
              setProject({ ...project, authorId: e.target.value })
            }
          /> */}
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
          <label htmlFor='collaborators'>Project Collaborators</label>
          <input
            type='text'
            id='collaborators'
            value={project.collaborators
              .map((collaborator) => collaborator.user.name)
              .join(" ")}
            onChange={handleCollaboratorsChange}
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
          <label htmlFor='done'>Done</label>
          <input
            type='checkbox'
            id='done'
            value={project.status ? "true" : "false"}
            onChange={(e) =>
              setProject({ ...project, status: e.target.checked })
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
