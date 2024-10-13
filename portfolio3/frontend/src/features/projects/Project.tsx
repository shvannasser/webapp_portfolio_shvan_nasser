import { Project as ProjectProps } from "../../types/types";

export default function Students(props: ProjectProps) {
  const { id, title, image, description } = props;

  return (
    <section>
      <h2>{title}</h2>
      <img
        id='project-image'
        src={image || "/bilder/placeholder.png"}
        alt={`${title} picture`}
      />
      <p> {description}</p>
    </section>
  );
}
