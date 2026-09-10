import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProject,
  getProjectById,
} from "../services/projectService";

import StatusText from "../components/ui/StatusText";

function ProjectDetailsPage() {
  const { projectId } = useParams();

  const project = projectId
    ? getProjectById(projectId)
    : undefined;

  const navigate = useNavigate();

  if (!project) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-white">
          Project Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          The requested project does not exist.
        </p>

        <Link
          to="/projects"
          className="mt-6 inline-block text-blue-400 hover:text-blue-300"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }
  const currentProject = project;
  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${currentProject.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const deleted = deleteProject(currentProject.id);

    if (deleted) {
      navigate("/projects");
    }
  }
  return (
    <div>
      {/* Back Navigation */}
      <Link
        to="/projects"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back to Projects
      </Link>

      {/* Project Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {project.name}
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() =>
              navigate(`/projects/${project.id}/edit`)
            }
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Edit Project
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-700 px-5 py-3 font-medium text-red-400 transition hover:border-red-500 hover:bg-red-950 hover:text-red-300"
          >
            Delete Project
          </button>
        </div>
      </div>

      {/* Project Information */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {/* Status */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Status
          </p>

          <StatusText status={project.status} />
        </div>

        {/* Type */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Type
          </p>

          <p className="mt-3 text-2xl font-semibold text-white">
            {project.type}
          </p>
        </div>

        {/* Environment */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Environment
          </p>

          <p className="mt-3 text-2xl font-semibold text-green-400">
            Online
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Project Overview
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;