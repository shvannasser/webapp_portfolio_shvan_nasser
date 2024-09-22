import { readFile, writeFile } from "node:fs/promises";
import { Project } from "./types";

export async function getProjectData() {
  const data = await readFile("./data/data.json", "utf8");
  const parsedData = JSON.parse(data) as Project[];
  return parsedData;
}

export async function updateProjectData(newProjects: Project[]) {
  await writeFile("./data/data.json", JSON.stringify(newProjects));
}
