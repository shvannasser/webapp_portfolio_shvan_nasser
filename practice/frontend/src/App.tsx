import Grid from "./components/Grid";
// import Student from "./components/Student";

// Liste med studenter
const students = [
  {
    id: "1",
    name: "Shvan",
  },
  {
    id: "2",
    name: "Emilie",
  },
];

function App() {
  return (
    <main>
      <h1>Test</h1>
      {/* <Student name='Shvan' id='123' /> */}
      {/* // Grid component is called with the students array as a prop
      // The Grid component will then create a Student component for each student in the students array */}
      <Grid students={students} />
    </main>
  );
}

export default App;
