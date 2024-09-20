import { useState } from "react";
import Student from "./Student";
import type { Student as StudentProp } from "./types";
import AddStudentForm from "./AddStudentForm";

// // Liste med studenter
// const students = [
//   {
//     id: "1",
//     name: "Shvan",
//   },
//   {
//     id: "2",
//     name: "Emilie",
//   },
// ];

type GridProps = {
  students: StudentProp[];
};

export default function Grid(props: GridProps) {
  const [students, setStudents] = useState<StudentProp[]>(props.students ?? []);

  const onAddStudent = (student: { name: string }) => {
    // Prev er gammel state og vi legger til en ny student i listen med studenter og setter den nye listen som ny state med setStudents.
    setStudents((prev) => [...prev, { id: crypto.randomUUID(), ...student }]);
  };

  // const { students } = props;

  return (
    <section>
      <article className='grid'>
        {/* // Gå gjennom listen med studenter og lag en Student-komponent for hver
        student

        // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
        
        // Student component is called for each student in the students array

        // The key prop is a special attribute that's required when creating lists of elements. The key prop is a unique identifier that helps React identify which items have changed, are added, or are removed. */}
        {students.map((student) => (
          <Student key={student.id} name={student.name} id={student.id} />
        ))}
      </article>
      <AddStudentForm onAddStudent={onAddStudent} />
    </section>
  );
}
