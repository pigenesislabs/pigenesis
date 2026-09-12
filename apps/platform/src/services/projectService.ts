import { createAppError } from "../utils/errorHandler";
import { logError, logInfo } from "../utils/logger";
import type {
  CreateProjectInput,
  Project,
  ProjectStatus,
} from "../types/project";

const STORAGE_KEY = "pigenesis_projects";

function readProjectsFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    logError("Project storage read failed", {
      operation: "readProjectsFromStorage",
      error,
    });

    throw createAppError(
      "STORAGE_ERROR",
      "Unable to read project data from storage."
    );
  }
}

function saveProjectsToStorage(projectsToSave: Project[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(projectsToSave)
    );
  } catch (error) {
    logError("Project storage write failed", {
      operation: "saveProjectsToStorage",
      error,
    });

    throw createAppError(
      "STORAGE_ERROR",
      "Unable to save project data to storage."
    );
  }
}

function validateProjectInput(
  input: CreateProjectInput
): void {
  const projectId = input.id.trim();

  if (!projectId) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(projectId)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project ID can contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!input.name.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project name is required."
    );
  }

  if (!input.description.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project description is required."
    );
  }

  if (!input.type.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project type is required."
    );
  }

  const validStatuses: ProjectStatus[] = [
    "Planning",
    "Active",
    "Completed",
  ];

  if (!validStatuses.includes(input.status)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project status is invalid."
    );
  }
}

function validateProjectUpdates(
  updates: Omit<Project, "id">
): void {
  if (!updates.name.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project name is required."
    );
  }

  if (!updates.description.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project description is required."
    );
  }

  if (!updates.type.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project type is required."
    );
  }

  const validStatuses: ProjectStatus[] = [
    "Planning",
    "Active",
    "Completed",
  ];

  if (!validStatuses.includes(updates.status)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Project status is invalid."
    );
  }
}

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
  const storedProjects = readProjectsFromStorage();

  if (!storedProjects) {
    saveProjectsToStorage(defaultProjects);
    return defaultProjects;
  }

  try {
    return JSON.parse(storedProjects) as Project[];
  } catch (error) {
    logError("Project storage data is invalid", {
      operation: "loadProjects",
      error,
    });

    saveProjectsToStorage(defaultProjects);
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
  validateProjectInput(input);
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

  saveProjectsToStorage(updatedProjects);

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
  validateProjectUpdates(updates);
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

  saveProjectsToStorage(updatedProjects);

  projects = updatedProjects;

  window.dispatchEvent(
    new Event("pigenesis-projects-updated")
  );

  return updatedProject;
}
export function deleteProject(projectId: string): boolean {
  const currentProjects = loadProjects();

  const projectExists = currentProjects.some(
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

  const updatedProjects = currentProjects.filter(
    (project) => project.id !== projectId
  );

  saveProjectsToStorage(updatedProjects);

  projects = updatedProjects;

  window.dispatchEvent(
    new Event("pigenesis-projects-updated")
  );

  logInfo("Project deleted", {
    operation: "deleteProject",
    projectId,
  });

  return true;
}