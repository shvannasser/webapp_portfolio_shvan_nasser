import { useApi } from "../hooks/useApi";
import GridProjects from "../components/Grid";
import MainIntro from "../components/MainIntro";

export default function MainPage() {
  const { data: projects, isLoading, error } = useApi();

  return (
    <section>
      <MainIntro />
      {isLoading && <p>Loading projects...</p>}
      {error && <p>Error fetching projects: {error}</p>}
      {!isLoading && !error && projects && <GridProjects projects={projects} />}
    </section>
  );
}

// import { useEffect, useState } from "react";
// import GridProjects from "../components/Grid";
// import MainIntro from "../components/MainIntro";
// import { useApi } from "../hooks/useApi";

// export default function MainPage() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch("http://localhost:3999");
//         const data = await response.json();
//         setProjects(data.data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   return (
//     <section>
//       <MainIntro />
//       <GridProjects projects={projects} />
//       {/* {isLoading && <p>Loading projects...</p>}
//       {error && <p>Error fetching projects: {error}</p>}
//       {!isLoading && !error && projects && <GridProjects projects={projects} />} */}
//     </section>
//   );
// }
