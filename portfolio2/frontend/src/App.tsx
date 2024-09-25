import Grid from "./components/Grid";
import Header from "./components/Layout/Header";
import MainIntro from "./components/Layout/MainIntro";
import Footer from "./components/Layout/Footer";
import { useEffect, useState } from "react";

// const projects = [
//   {
//     id: "e2566083-d1d6-46b7-a875-db8689979b4b",
//     title: "Project 1",
//     description:
//       "This project focuses on the advanced features and capabilities of HTML5, including multimedia integration, enhanced form controls, and improved semantic elements. It aims to demonstrate how HTML5 can be used to create modern, responsive, and accessible web applications.",
//   },
//   {
//     id: "c2749627-254f-43b7-b779-a1de26bb4314",
//     title: "Project 2",
//     description:
//       "The project explores the innovative aspects of HTML5, such as its support for audio and video elements, canvas for drawing graphics, and new APIs for offline storage and geolocation. It showcases practical examples and best practices for leveraging HTML5 to build dynamic and interactive web experiences.",
//   },
//   {
//     id: "666b9a03-bed9-4ab2-b619-b6adfbabdddc",
//     title: "Project 3",
//     description:
//       "This project focuses on the advanced features and capabilities of HTML5.",
//   },
// ];

//TODO
//TODO
//TODO
//TODO

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3999");
        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  });

  return (
    <body>
      <Header />
      <main>
        <MainIntro />
        <Grid projects={projects} />
      </main>
      <Footer />
    </body>
  );
}

export default App;
