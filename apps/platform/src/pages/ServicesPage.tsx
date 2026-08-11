import { Link } from "react-router-dom";
import { services } from "../services/serviceService";
import StatusBadge from "../components/ui/StatusBadge";

function ServicesPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-white">
        Services
      </h1>

      <p className="mt-4 text-xl text-slate-400">
        PiGenesis services and capabilities.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="block rounded-xl border border-slate-700 bg-slate-900 p-6 transition hover:border-blue-500 hover:bg-slate-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {service.name}
                </h2>

                <p className="mt-3 text-slate-400">
                  {service.description}
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  {service.category}
                </p>
              </div>

              <StatusBadge status={service.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;