import { Project as ProjectProps } from "../../types/types";
import { format } from "date-fns";

export default function Students(props: ProjectProps) {
  const {
    id,
    title,
    tags,
    publishedAt,
    isPublic,
    status,
    image,
    authorId,
    authorName,
    description,
    collaborators,
  } = props;

  return (
    <section>
      <h2>{title}</h2>
      <p>Author: {authorName}</p>
      <p>Tags: {tags.map((tag) => tag.name).join(", ")}</p>
      <img
        id='project-image'
        src={image || "/bilder/placeholder.png"}
        alt={`${title} picture`}
      />
      <p> {description}</p>
      <section>
        <p>Published at: {format(new Date(publishedAt), "yyyy-MM-dd")}</p>
        <p>{isPublic ? "Public" : "Private"}</p>
        <p>{status ? "Done" : "Ongoing"}</p>
      </section>
      {collaborators && collaborators.length > 0 && (
        <section>
          <h3>Collaborators</h3>
          <ul>
            {collaborators.map((collaborator) => (
              <li key={collaborator.user.id}>{collaborator.user.name}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
