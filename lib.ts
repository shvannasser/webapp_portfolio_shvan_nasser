import { readFile, writeFile } from "node:fs/promises";
import { Project } from "./types";

export async function getProjectData() {
  const data = await readFile("./data.json", "utf8");
  const parsedData = JSON.parse(data) as Project[];
  return parsedData;
}

export async function updateProjectData(newProjects: Project[]) {
  await writeFile("./data.json", JSON.stringify(newProjects));
  //   await writeFile("./data.json", JSON.stringify({ newProjects }, null, 2));
  // the null and 2 is for formatting the JSON file with 2 spaces indentation
}
