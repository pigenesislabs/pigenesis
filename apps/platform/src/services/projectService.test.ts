import { beforeEach, describe, expect, it } from "vitest";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "./projectService";

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
});