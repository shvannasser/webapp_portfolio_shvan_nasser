import { Project as ProjectProps } from "./types";

export default function Students(props: ProjectProps) {
  const { id, title, description } = props;

  return (
    <section>
      <h2>{title}</h2>
      <p> {description}</p>
    </section>
  );
}
