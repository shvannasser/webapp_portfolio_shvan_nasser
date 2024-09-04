import "./style.css"

const postProjectButton = document.getElementById("postProjectButton")
const projectForm = document.getElementById(
  "postProjectForm"
) as HTMLFormElement
const projectSection = document.getElementById("enkel-prosjekt")

if (postProjectButton && projectForm && projectSection) {
  postProjectButton.addEventListener("click", function () {
    projectForm.style.display = "block" // Show the form
  })

  projectForm.addEventListener("submit", function (event) {
    event.preventDefault() // Prevent the form from submitting the traditional way

    const titleInput = document.getElementById(
      "projectTitle"
    ) as HTMLInputElement
    const tagsInput = document.getElementById("projectTags") as HTMLInputElement
    const descriptionInput = document.getElementById(
      "projectDescription"
    ) as HTMLTextAreaElement

    const newProject = {
      title: titleInput.value,
      tags: tagsInput.value.split(",").map((tag) => tag.trim()),
      description: descriptionInput.value,
    }

    addProjectToPage(newProject)

    // Optionally, clear the form fields
    titleInput.value = ""
    tagsInput.value = ""
    descriptionInput.value = ""

    projectForm.style.display = "none" // Hide the form after submission
  })

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      projectSection.innerHTML = "" // Clear any existing projects

      data.projects.forEach(
        (project: { title: string; tags: string[]; description: string }) => {
          addProjectToPage(project)
        }
      )
    })
    .catch((error) => console.error("Error loading data:", error))
}

function addProjectToPage(project: {
  title: string
  tags: string[]
  description: string
}) {
  const article = document.createElement("article")

  const h3 = document.createElement("h3")
  h3.textContent = project.title
  article.appendChild(h3)

  const tagsP = document.createElement("p")
  tagsP.textContent = `[ ${project.tags.join(", ")} ]`
  article.appendChild(tagsP)

  const descriptionP = document.createElement("p")
  descriptionP.textContent = project.description
  article.appendChild(descriptionP)

  projectSection?.appendChild(article)
}
