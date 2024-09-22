import { useState } from "react";

type AddStudentFormProps = {
  onAddStudent: ({ name }: { name: string }) => void;
};

export default function AddStudentForm(props: AddStudentFormProps) {
  const { onAddStudent } = props;
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAddStudent({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className='add-student-form'>
      <label htmlFor='name'>Navn</label>
      <input
        type='text'
        id='name'
        placeholder='Studentens navn'
        // value and on change is used to control the input field value with React state to make it a controlled component.
        // This gives us the opportunity to validate the input and show error messages if needed and also to submit the input value to the server.
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit'>Legg til student</button>
    </form>
  );
}
