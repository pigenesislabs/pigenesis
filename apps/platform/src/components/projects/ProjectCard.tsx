import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import StatusBadge from "../ui/StatusBadge";

type Props = {
  project: Project;
};

function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block rounded-xl border border-slate-700 bg-slate-900 p-6 transition hover:border-blue-500 hover:bg-slate-800"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {project.name}
          </h2>

          <p className="mt-2 text-slate-400">
            {project.description}
          </p>
        </div>

        <StatusBadge status={project.status} />
      </div>
    </Link>
  );
}

export default ProjectCard;