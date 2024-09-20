import Avatar from "./Avatar";
import type { Student as StudentProps } from "./types";

// type StudentProps = {
//   id: string;
//   name: string;
// };

export default function Student(props: StudentProps) {
  const { id, name } = props;

  return (
    <div>
      <Avatar name={name} />
      <p className='student'>{name}</p>
    </div>
  );
}
