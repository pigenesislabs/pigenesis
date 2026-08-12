import { Link, useParams } from "react-router-dom";
import { services } from "../services/serviceService";

import StatusText from "../components/ui/StatusText";

function ServiceDetailsPage() {
  const { serviceId } = useParams();

  const service = services.find(
    (item) => item.id === serviceId
  );

  if (!service) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-white">
          Service Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          The requested service does not exist.
        </p>

        <Link
          to="/services"
          className="mt-6 inline-block text-blue-400 hover:text-blue-300"
        >
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/services"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back to Services
      </Link>

      <div className="mt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">
              {service.name}
            </h1>

            <p className="mt-4 text-xl text-slate-400">
              {service.description}
            </p>
          </div>

          {/*<StatusBadge status={service.status} />*/}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Status
          </p>

          <StatusText status={service.status} />
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Category
          </p>

          <p className="mt-3 text-2xl font-semibold text-white">
            {service.category}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Platform
          </p>

          <p className="mt-3 text-2xl font-semibold text-green-400">
            PiGenesis
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Service Overview
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default ServiceDetailsPage;