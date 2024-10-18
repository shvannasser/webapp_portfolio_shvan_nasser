import { Project as ProjectProps } from "../../types/types";

export default function Students(props: ProjectProps) {
  const { id, title, tags, publishedAt, isPublic, status, image, description } =
    props;

  return (
    <section>
      <h2>{title}</h2>
      <p>Tags: {tags}</p>
      <img
        id='project-image'
        src={image || "/bilder/placeholder.png"}
        alt={`${title} picture`}
      />
      <p> {description}</p>
      <section>
        <p>Published at: {publishedAt}</p>
        <p>{isPublic ? "Public" : "Private"}</p>
        <p>{status ? "Done" : "Ongoing"}</p>
      </section>
    </section>
  );
}
