import { useEffect, useState } from "react";
import GridProjects from "../components/Grid";
import MainIntro from "../components/MainIntro";

export default function MainPage() {
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
  }, []);

  return (
    <section>
      <MainIntro />
      <GridProjects projects={projects} />
    </section>
  );
}
