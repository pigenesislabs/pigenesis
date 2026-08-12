import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../services/projectService";

function ProjectsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-white">
        Projects
      </h1>

      <p className="mt-4 text-xl text-slate-400">
        Manage PiGenesis engineering projects.
      </p>

      <div className="mt-10 space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;