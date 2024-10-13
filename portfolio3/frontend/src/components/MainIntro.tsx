export default function MainIntro() {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3999");
  //       const data = await response.json();
  //       setProjects(data.data);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   };
  //   fetchProjects();
  // }, []);

  return (
    <section>
      <section id='intro-section'>
        <article id='intro-article'>
          <h2>Hei, jeg er Shvan Nasser 👋🏽</h2>
          <p>
            Jeg er ferdigutdannet i informasjonssystemer med fordypning i
            programvareutvikling og testing ved Høgskolen i Østfold 🎓.
          </p>
          <p>
            Min lidenskap ligger i å skape nyttige og brukervennlige
            applikasjoner. Jeg ser med spenning fram til å møte nye
            utfordringer, er dedikert til kontinuerlig læring, og er ivrig etter
            å bidra til å skape meningsfulle digitale opplevelser for brukere
            🚀.
          </p>
          <p>På fritiden liker jeg å holde på med: ⛰️🏓🏐🏋🏽‍♂️🏃👨‍💻</p>
        </article>
        <article id='bilde'>
          <img src='/bilder/Shvan.jpg' alt='bilde av meg' />
        </article>
      </section>
      {/* <GridProjects projects={projects} /> */}
    </section>
  );
}
