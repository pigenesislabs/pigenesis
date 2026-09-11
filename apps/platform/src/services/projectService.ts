import { createAppError } from "../utils/errorHandler";
import { logError, logInfo, } from "../utils/logger";
import type { CreateProjectInput, Project, } from "../types/project";

const STORAGE_KEY = "pigenesis_projects";

const defaultProjects: Project[] = [
  {
    id: "pigenesis-platform",
    name: "PiGenesis Platform",
    status: "Active",
    description: "Core engineering platform",
    type: "Platform",
  },
  {
    id: "ai-research",
    name: "AI Research",
    status: "Planning",
    description: "Artificial intelligence research initiative",
    type: "Research",
  },
  {
    id: "automation-engine",
    name: "Automation Engine",
    status: "Planning",
    description: "Intelligent workflow automation platform",
    type: "Platform",
  },
];

function loadProjects(): Project[] {
  const storedProjects = localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProjects)
    );

    return defaultProjects;
  }

  try {
    return JSON.parse(storedProjects) as Project[];
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProjects)
    );

    return defaultProjects;
  }
}

/*
 * Backward-compatible project collection.
 *
 * Existing pages still use `projects`.
 * We will migrate those pages to `getProjects()`
 * in the next task.
 */
export let projects: Project[] = loadProjects();

export function getProjects(): Project[] {
  projects = loadProjects();
  return projects;
}

export function createProject(
  input: CreateProjectInput
): Project {
  const currentProjects = loadProjects();

  if (
    currentProjects.some(
      (project) => project.id === input.id
    )
  ) {
    logError("Project creation failed", {
      operation: "createProject",
      projectId: input.id,
      errorCode: "DUPLICATE",
    });

    throw createAppError(
      "DUPLICATE",
      "A project with this ID already exists."
    );
  }

  const project: Project = {
    id: input.id,
    name: input.name,
    status: input.status,
    description: input.description,
    type: input.type,
  };

  const updatedProjects = [
    ...currentProjects,
    project,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProjects)
  );

  projects = updatedProjects;

  window.dispatchEvent(
    new Event("pigenesis-projects-updated")
  );

  logInfo("Project created", {
    operation: "createProject",
    projectId: project.id,
  });

  return project;
}
export function getProjectById(
  projectId: string
): Project | undefined {
  const currentProjects = loadProjects();

  return currentProjects.find(
    (project) => project.id === projectId
  );
}

export function updateProject(
  projectId: string,
  updates: Omit<Project, "id">
): Project | undefined {
  const currentProjects = loadProjects();

  const projectIndex = currentProjects.findIndex(
    (project) => project.id === projectId
  );

  if (projectIndex === -1) {
    return undefined;
  }

  const updatedProject: Project = {
    ...currentProjects[projectIndex],
    ...updates,
    id: projectId,
  };

  const updatedProjects = [...currentProjects];

  updatedProjects[projectIndex] = updatedProject;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProjects)
  );

  projects = updatedProjects;

  window.dispatchEvent(
    new Event("pigenesis-projects-updated")
  );

  return updatedProject;
}
export function deleteProject(projectId: string): boolean {
  const projectExists = projects.some(
    (project) => project.id === projectId
  );

  if (!projectExists) {
    logError("Project deletion failed", {
      operation: "deleteProject",
      projectId,
      errorCode: "NOT_FOUND",
    });

    return false;
  }

  projects = projects.filter(
    (project) => project.id !== projectId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projects)
  );

  window.dispatchEvent(
    new Event("pigenesis-projects-updated")
  );
  logInfo("Project deleted", {
    operation: "deleteProject",
    projectId,
  });

  return true;
}