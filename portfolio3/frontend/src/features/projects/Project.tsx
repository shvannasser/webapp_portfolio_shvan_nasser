import { Project as ProjectProps } from "../../types/types";
import { format } from "date-fns";

type ProjectComponentProps = ProjectProps & {
  onUpdateProject: (
    projectId: string,
    projectData: Partial<ProjectProps>
  ) => Promise<void>;
  onDeleteProject: (projectId: string) => Promise<void>;
};

export default function Project(props: ProjectComponentProps) {
  const {
    id,
    title,
    publishedAt,
    createdAt,
    isPublic,
    status,
    image,
    description,
    onDeleteProject,
    onUpdateProject,
  } = props;

  return (
    <section>
      <div className='button-projects'>
        <button onClick={() => onUpdateProject(id, { isPublic: !isPublic })}>
          {isPublic ? "Make Private" : "Make Public"}
        </button>
        <button onClick={() => onDeleteProject(id)}>X</button>
      </div>
      <h2>{title}</h2>

      <img
        id='project-image'
        src={image || "/bilder/placeholder.png"}
        alt={`${title} picture`}
      />
      <p> {description}</p>
      <section>
        <p>Created at: {format(new Date(createdAt), "yyyy-MM-dd")}</p>
        <p>Published at: {format(new Date(publishedAt), "yyyy-MM-dd")}</p>
        <p>{isPublic ? "Public" : "Private"}</p>
        <p>{status ? "Published" : "Draft"}</p>
      </section>
      {/* {collaborators && collaborators.length > 0 && (
        <section>
          <h3>Collaborators</h3>
          <ul>
            {collaborators.map((collaborator) => (
              <li key={collaborator.user.id}>{collaborator.user.name}</li>
            ))}
          </ul>
        </section>
      )} */}
    </section>
  );
}
