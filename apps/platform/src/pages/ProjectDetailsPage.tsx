import { Link, useParams } from "react-router-dom";
import { projects } from "../services/projectService";

import StatusText from "../components/ui/StatusText";

function ProjectDetailsPage() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === projectId
  );

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
      <div className="mt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">
              {project.name}
            </h1>

            <p className="mt-4 text-xl text-slate-400">
              {project.description}
            </p>
          </div>

          {/* <StatusBadge status={project.status} /> */}
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