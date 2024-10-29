import { Project as ProjectProps } from "../../types/types";
import { format } from "date-fns";

type ProjectComponentProps = ProjectProps & {
  onDeleteProject: (projectId: string) => Promise<void>;
  onEditProject: (project: ProjectProps) => void;
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
    onEditProject,
  } = props;
  const handleEditClick = () => {
    onEditProject(props);
  };

  return (
    <section>
      <div className='button-projects'>
        <button onClick={handleEditClick}>Edit</button>
        <button id='delete-button' onClick={() => onDeleteProject(id)}>
          Delete
        </button>
      </div>
      <h2>{title}</h2>
      <img
        id='project-image'
        src={image || "/bilder/placeholder.png"}
        alt={`${title} picture`}
      />
      <p>{description}</p>
      <section>
        <p>Created at: {format(new Date(createdAt), "yyyy-MM-dd")}</p>
        {status && (
          <p>Published at: {format(new Date(publishedAt), "yyyy-MM-dd")}</p>
        )}{" "}
        <p>Visibility: {isPublic ? "Public" : "Private"}</p>
        <p>Status: {status ? "Published" : "Draft"}</p>
      </section>
    </section>
  );
}
