import { Project } from "./types";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const displayProjects = (projects: Project[]) => {
  const projectSection = document.getElementById("enkel-prosjekt");

  if (projectSection) {
    projectSection.innerHTML = ""; // Clear existing projects
    projects.forEach((project) => {
      console.log(project);
      const article = document.createElement("article");
      const h3 = document.createElement("h3");
      h3.textContent = project.title;
      article.appendChild(h3);

      const p = document.createElement("p");
      p.textContent = project.description ?? "No description available";
      article.appendChild(p);

      projectSection.appendChild(article);
    });
  }
};

const loadProjectData = async () => {
  // Fetches the project data from the server
  try {
    const response = await fetch("http://localhost:3999", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.data);
      displayProjects(data.data); // Call displayProjects with the fetched data
    } else {
      console.error("Failed to load projects:", response.statusText);
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }
};

const addProjectData = async (project: Omit<Project, "id">) => {
  try {
    const newProject: Project = { id: uuidv4(), ...project };

    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    console.log(response.status);
    console.log(response.ok);

    const data = await response.json();
    loadProjectData();

    console.log(data);
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

// Event listener for form submission
const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  const titleInput = (
    form.elements.namedItem("projectTitle") as HTMLInputElement
  )?.value;
  const descriptionInput = (
    form.elements.namedItem("projectDescription") as HTMLInputElement
  )?.value;

  try {
    await addProjectData({ title: titleInput, description: descriptionInput });
  } catch (error) {
    console.log("Error adding project:", error);
  }
});

loadProjectData();
