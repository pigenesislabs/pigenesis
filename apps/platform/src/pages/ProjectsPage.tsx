import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/projectService";
import type { Project, ProjectStatus } from "../types/project";

function getStatusClasses(status: ProjectStatus) {
  switch (status) {
    case "Active":
      return "bg-green-600 text-white";

    case "Completed":
      return "bg-slate-600 text-white";

    case "Planning":
      return "bg-blue-600 text-white";

    default:
      return "bg-slate-700 text-slate-200";
  }
}

function ProjectsPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] =
    useState<"All" | ProjectStatus>("All");

  // Sort
  const [sortOption, setSortOption] = useState<
    "newest" | "oldest" | "name-asc" | "name-desc"
  >("newest");

  useEffect(() => {
    const refreshProjects = () => {
      setProjects(getProjects());
    };

    refreshProjects();

    window.addEventListener(
      "pigenesis-projects-updated",
      refreshProjects
    );

    return () => {
      window.removeEventListener(
        "pigenesis-projects-updated",
        refreshProjects
      );
    };
  }, []);

  /*
   * Search, filter and sort projects.
   */
  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let result = projects.filter((project) => {
      // Status filter
      if (
        statusFilter !== "All" &&
        project.status !== statusFilter
      ) {
        return false;
      }

      // Search filter
      if (normalizedSearch) {
        const searchableText = [
          project.name,
          project.id,
          project.description,
          project.type,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(normalizedSearch)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    switch (sortOption) {
      case "newest":
        // Current projects are stored oldest → newest.
        // Reverse the collection to show newest first.
        result = [...result].reverse();
        break;

      case "oldest":
        // Keep the original collection order.
        result = [...result];
        break;

      case "name-asc":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-desc":
        result = [...result].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;
    }

    return result;
  }, [projects, searchTerm, statusFilter, sortOption]);

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            Manage PiGenesis engineering projects.
          </p>
        </div>

        {/* Create Project Button */}
        <button
          type="button"
          onClick={() => navigate("/projects/new")}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          + Create Project
        </button>
      </div>

      {/* Search / Filter / Sort */}
      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="md:col-span-1">
            <label
              htmlFor="project-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search
            </label>

            <input
              id="project-search"
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search projects..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="project-status-filter"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="project-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                  | "All"
                  | ProjectStatus
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="project-sort"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Sort
            </label>

            <select
              id="project-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as
                  | "newest"
                  | "oldest"
                  | "name-asc"
                  | "name-desc"
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Count */}
      {/* Project Count */}
      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-300">
            {filteredProjects.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-300">
            {projects.length}
          </span>{" "}
          projects
        </p>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() =>
                navigate(`/projects/${project.id}`)
              }
              className="group rounded-xl border border-slate-700 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400">
                    {project.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.id}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                {project.description}
              </p>

              {/* Project Type */}
              <div className="mt-6 border-t border-slate-800 pt-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-200">
                  {project.type}
                </p>
              </div>

              {/* View Details */}
              <div className="mt-5 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                View Project →
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Empty / No Results State */
        <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          {projects.length === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-white">
                No projects yet
              </h2>

              <p className="mt-2 text-slate-400">
                Create your first PiGenesis engineering
                project.
              </p>

              <button
                type="button"
                onClick={() => navigate("/projects/new")}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
              >
                + Create Project
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">
                No matching projects
              </h2>

              <p className="mt-2 text-slate-400">
                Try changing your search or filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-6 rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;