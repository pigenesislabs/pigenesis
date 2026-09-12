import {
  beforeEach,
  describe,
  expect,
  it,

} from "vitest";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "./projectService";

import type { ProjectStatus } from "../types/project";

beforeEach(() => {
  localStorage.clear();
});

describe("projectService", () => {
  it("loads default projects when no stored projects exist", () => {
    const projects = getProjects();

    expect(projects.length).toBeGreaterThan(0);
  });

  it("creates a new project", () => {
    const project = createProject({
      id: "test-project",
      name: "Test Project",
      status: "Planning",
      description: "Testing project creation.",
      type: "Testing",
    });

    expect(project.id).toBe("test-project");
    expect(project.name).toBe("Test Project");

    const savedProject =
      getProjectById("test-project");

    expect(savedProject).toEqual(project);
  });

  it("rejects duplicate project IDs", () => {
    createProject({
      id: "duplicate-project",
      name: "Duplicate Project",
      status: "Planning",
      description: "First project.",
      type: "Testing",
    });

    expect(() =>
      createProject({
        id: "duplicate-project",
        name: "Duplicate Project 2",
        status: "Planning",
        description: "Second project.",
        type: "Testing",
      })
    ).toThrow(
      "A project with this ID already exists."
    );
  });

  it("updates an existing project", () => {
    createProject({
      id: "update-project",
      name: "Original Project",
      status: "Planning",
      description: "Original description.",
      type: "Testing",
    });

    const updatedProject = updateProject(
      "update-project",
      {
        name: "Updated Project",
        status: "Active",
        description: "Updated description.",
        type: "Platform",
      }
    );

    expect(updatedProject?.name).toBe(
      "Updated Project"
    );

    expect(updatedProject?.status).toBe("Active");

    expect(
      getProjectById("update-project")?.description
    ).toBe("Updated description.");
  });

  it("deletes an existing project", () => {
    createProject({
      id: "delete-project",
      name: "Delete Project",
      status: "Planning",
      description: "Project to delete.",
      type: "Testing",
    });

    const deleted = deleteProject("delete-project");

    expect(deleted).toBe(true);

    expect(
      getProjectById("delete-project")
    ).toBeUndefined();
  });

  it("returns false when deleting a project that does not exist", () => {
    const deleted = deleteProject(
      "does-not-exist"
    );

    expect(deleted).toBe(false);
  });
  it("throws STORAGE_ERROR when project storage cannot be read", () => {
    const originalLocalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error("Storage read failure");
        },
        setItem: () => { },
      },
    });

    expect(() => getProjects()).toThrow(
      "Unable to read project data from storage."
    );

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
  });

  it("throws STORAGE_ERROR when project storage cannot be written", () => {
    const originalLocalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => JSON.stringify([]),
        setItem: () => {
          throw new Error("Storage write failure");
        },
      },
    });

    expect(() =>
      createProject({
        id: "storage-error-project",
        name: "Storage Error Project",
        status: "Planning",
        description: "Testing storage failure.",
        type: "Testing",
      })
    ).toThrow(
      "Unable to save project data to storage."
    );

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });
  });

  it("rejects a project with an empty ID", () => {
    expect(() =>
      createProject({
        id: "",
        name: "Test Project",
        status: "Planning",
        description: "Testing validation.",
        type: "Testing",
      })
    ).toThrow("Project ID is required.");
  });

  it("rejects a project with an invalid ID format", () => {
    expect(() =>
      createProject({
        id: "Invalid Project ID",
        name: "Test Project",
        status: "Planning",
        description: "Testing validation.",
        type: "Testing",
      })
    ).toThrow(
      "Project ID can contain only lowercase letters, numbers, and hyphens."
    );
  });

  it("rejects a project with an empty name", () => {
    expect(() =>
      createProject({
        id: "validation-project",
        name: "",
        status: "Planning",
        description: "Testing validation.",
        type: "Testing",
      })
    ).toThrow("Project name is required.");
  });
  it("rejects a project with an empty description", () => {
    expect(() =>
      createProject({
        id: "validation-description",
        name: "Validation Project",
        status: "Planning",
        description: "",
        type: "Testing",
      })
    ).toThrow("Project description is required.");
  });

  it("rejects a project with an empty type", () => {
    expect(() =>
      createProject({
        id: "validation-type",
        name: "Validation Project",
        status: "Planning",
        description: "Testing validation.",
        type: "",
      })
    ).toThrow("Project type is required.");
  });

  it("rejects a project with an invalid status", () => {
    expect(() =>
      createProject({
        id: "validation-status",
        name: "Validation Project",
        status: "Invalid" as ProjectStatus,
        description: "Testing validation.",
        type: "Testing",
      })
    ).toThrow("Project status is invalid.");
  });
  it("rejects an update with an empty name", () => {
    expect(() =>
      updateProject("update-project", {
        name: "",
        status: "Planning",
        description: "Updated description.",
        type: "Testing",
      })
    ).toThrow("Project name is required.");
  });

  it("rejects an update with an empty description", () => {
    expect(() =>
      updateProject("update-project", {
        name: "Updated Project",
        status: "Planning",
        description: "",
        type: "Testing",
      })
    ).toThrow("Project description is required.");
  });

  it("rejects an update with an empty type", () => {
    expect(() =>
      updateProject("update-project", {
        name: "Updated Project",
        status: "Planning",
        description: "Updated description.",
        type: "",
      })
    ).toThrow("Project type is required.");
  });

  it("rejects an update with an invalid status", () => {
    expect(() =>
      updateProject("update-project", {
        name: "Updated Project",
        status: "Invalid" as ProjectStatus,
        description: "Updated description.",
        type: "Testing",
      })
    ).toThrow("Project status is invalid.");
  });
    it("deletes a project using the current stored project data", () => {
    createProject({
      id: "stored-delete-project",
      name: "Stored Delete Project",
      status: "Planning",
      description: "Testing stored project deletion.",
      type: "Testing",
    });

    localStorage.setItem(
      "pigenesis_projects",
      JSON.stringify([
        {
          id: "stored-delete-project",
          name: "Stored Delete Project",
          status: "Planning",
          description: "Testing stored project deletion.",
          type: "Testing",
        },
      ])
    );

    const deleted = deleteProject(
      "stored-delete-project"
    );

    expect(deleted).toBe(true);

    expect(
      JSON.parse(
        localStorage.getItem("pigenesis_projects") || "[]"
      )
    ).toEqual([]);
  });
});