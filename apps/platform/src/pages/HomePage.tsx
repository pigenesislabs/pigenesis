import { projects } from "../services/projectService";
import { products } from "../services/productService";
import { services } from "../services/serviceService";
import StatCard from "../components/ui/StatCard";

type StatusItem = {
  status: string;
};

const statusList = [
  {
    name: "Active",
    className: "text-green-400",
  },
  {
    name: "Planning",
    className: "text-blue-400",
  },
  {
    name: "Completed",
    className: "text-red-300",
  },
  {
    name: "Coming Soon",
    className: "text-purple-400",
  },
];

function getStatusCount(
  items: StatusItem[],
  status: string
) {
  return items.filter(
    (item) => item.status === status
  ).length;
}

function HomePage() {
  const projectCount = projects.length;
  const productCount = products.length;
  const serviceCount = services.length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          PiGenesis Engineering Platform
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={projectCount}
        />

        <StatCard
          title="Products"
          value={productCount}
        />

        <StatCard
          title="Services"
          value={serviceCount}
        />

        <StatCard
          title="System Status"
          value="Online"
          valueClassName="text-green-400"
        />
      </div>

      {/* Platform Overview */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Platform Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Current status across the PiGenesis ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Projects */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">
            Projects
          </h3>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Total
              </span>

              <span className="font-semibold text-white">
                {projectCount}
              </span>
            </div>

            {statusList.map((status) => (
              <div
                key={status.name}
                className="flex justify-between"
              >
                <span className="text-slate-400">
                  {status.name}
                </span>

                <span
                  className={`font-semibold ${status.className}`}
                >
                  {getStatusCount(projects, status.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">
            Products
          </h3>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Total
              </span>

              <span className="font-semibold text-white">
                {productCount}
              </span>
            </div>

            {statusList.map((status) => (
              <div
                key={status.name}
                className="flex justify-between"
              >
                <span className="text-slate-400">
                  {status.name}
                </span>

                <span
                  className={`font-semibold ${status.className}`}
                >
                  {getStatusCount(products, status.name)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold text-white">
            Services
          </h3>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Total
              </span>

              <span className="font-semibold text-white">
                {serviceCount}
              </span>
            </div>

            {statusList.map((status) => (
              <div
                key={status.name}
                className="flex justify-between"
              >
                <span className="text-slate-400">
                  {status.name}
                </span>

                <span
                  className={`font-semibold ${status.className}`}
                >
                  {getStatusCount(services, status.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Description */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          PiGenesis Platform
        </h2>

        <p className="mt-3 max-w-3xl text-slate-400">
          Engineering intelligent systems through a scalable
          platform architecture.
        </p>
      </div>
    </div>
  );
}

export default HomePage;