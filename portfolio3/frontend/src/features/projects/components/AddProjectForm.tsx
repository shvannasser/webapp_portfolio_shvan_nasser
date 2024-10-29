import React, { useState } from "react";
import { format } from "date-fns";
import { z } from "zod";
import type { Project as ProjectType } from "../../../types/types";
import { projectSchema } from "../ProjectSchema";

type AddProjectFormProps = {
  onAddProject: (project: ProjectType) => Promise<void>;
  onClose: () => void; // Prop to close the form
};

const AddProjectForm: React.FC<AddProjectFormProps> = ({
  onAddProject,
  onClose,
}) => {
  const [project, setProject] = useState<ProjectType>({
    id: "",
    title: "",
    isPublic: false,
    status: false,
    image: "",
    description: "",
    createdAt: format(new Date(), "yyyy-MM-dd"),
    publishedAt: format(new Date(), "yyyy-MM-dd"),
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      projectSchema.parse(project); // Validate using projectSchema
      await onAddProject(project);
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
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className='projectForm'>
          {errors.length > 0 && (
            <div className='error-messages'>
              {errors.map((error, index) => (
                <p key={index} className='error-message'>
                  {error}
                </p>
              ))}
            </div>
          )}
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Enter project title'
            id='title'
            name='title'
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />

          <div className='checkbox-container'>
            <label htmlFor='public'>Public</label>
            <input
              type='checkbox'
              id='public'
              name='isPublic'
              checked={project.isPublic}
              onChange={(e) =>
                setProject({ ...project, isPublic: e.target.checked })
              }
            />

            <label htmlFor='status'>Status</label>
            <input
              type='checkbox'
              id='status'
              name='status'
              checked={project.status}
              onChange={(e) =>
                setProject({ ...project, status: e.target.checked })
              }
            />
          </div>

          <label htmlFor='image'>Project Image URL</label>
          <input
            type='text'
            id='image'
            name='image'
            value={project.image}
            onChange={(e) => setProject({ ...project, image: e.target.value })}
          />

          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />

          <button type='submit'>Add Project</button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;

// import { useState } from "react";
// import { format } from "date-fns";
// import type { Project as ProjectProp } from "../../../types/types";
// import { projectSchema, createProject, updateProject } from "../../schemas/ProjectSchema";
// import { z } from "zod";

// type AddProjectFormProps = {
//   onAddProject: (project: ProjectProp) => Promise<void>;
// };

// export default function AddProjectForm(props: AddProjectFormProps) {
//   const { onAddProject } = props;
//   const [project, setProject] = useState({
//     id: "",
//     title: "",
//     isPublic: false,
//     status: false,
//     image: "",
//     description: "",
//     createdAt: format(new Date(), "yyyy-MM-dd"),
//     publishedAt: format(new Date(), "yyyy-MM-dd"),
//   });

//   const [show, setShow] = useState(false);

//   const showProjects = () => {
//     setShow(!show);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!project.title || !project.description)
//       return alert(
//         `Please fill out title and description fields before submitting`
//       );
//     onAddProject(project);
//   };

//   return (
//     <section className='formContainer'>
//       <button
//         onClick={showProjects}
//         // Gjør at vi kan velge mellom to forskjellige klasser basert på state til show mtp CSS.
//         // forskjell mellom ? og ?? er at ?? sjekker om det er null eller undefined mens ? sjekker om det er true eller false.
//         className={show ? "close-form-button" : "show-form-button"}
//       >
//         {show ? "Close form" : "Create a new project"}
//       </button>{" "}
//       {show && (
//         <form onSubmit={handleSubmit} className='projectForm'>
//           <label htmlFor='title'>Title</label>
//           <input
//             type='text'
//             placeholder='Enter project title'
//             id='title'
//             value={project.title}
//             // onChange = {handleChange}
//             onChange={(e) => setProject({ ...project, title: e.target.value })}
//           />

//           <label htmlFor='public'>Public</label>
//           <input
//             type='checkbox'
//             id='public'
//             value={project.isPublic ? "true" : "false"}
//             onChange={(e) =>
//               setProject({ ...project, isPublic: e.target.checked })
//             }
//           />
//           <label htmlFor='done'>Done</label>
//           <input
//             type='checkbox'
//             id='done'
//             value={project.status ? "true" : "false"}
//             onChange={(e) =>
//               setProject({ ...project, status: e.target.checked })
//             }
//           />
//           <label htmlFor='image'>Image</label>
//           <input
//             type='text'
//             placeholder='Enter project image'
//             id='image'
//             value={project.image}
//             onChange={(e) => setProject({ ...project, image: e.target.value })}
//           />

//           <label htmlFor='description'>Description</label>
//           <input
//             type='text'
//             placeholder='Enter project description'
//             id='description'
//             value={project.description}
//             onChange={(e) =>
//               setProject({ ...project, description: e.target.value })
//             }
//           />
//           <button type='submit'>Add Project</button>
//         </form>
//       )}
//     </section>
//   );
// }
