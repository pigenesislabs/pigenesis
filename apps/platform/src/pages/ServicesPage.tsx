import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/serviceService";
import type {
  Service,
  ServiceStatus,
} from "../types/service";
import StatusBadge from "../components/ui/StatusBadge";

type ServiceSortOption =
  | "name-asc"
  | "name-desc"
  | "category-asc"
  | "status";

function ServicesPage() {
  const [services, setServices] = useState<Service[]>(
    getServices()
  );

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] =
    useState<ServiceStatus | "All">("All");

  // Sort
  const [sortOption, setSortOption] =
    useState<ServiceSortOption>("name-asc");

  useEffect(() => {
    const handleServicesUpdated = () => {
      setServices(getServices());
    };

    window.addEventListener(
      "pigenesis-services-updated",
      handleServicesUpdated
    );

    return () => {
      window.removeEventListener(
        "pigenesis-services-updated",
        handleServicesUpdated
      );
    };
  }, []);

  /*
   * Search, filter and sort services.
   */
  const filteredAndSortedServices = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    const filtered = services.filter((service) => {
      const matchesSearch =
        !normalizedSearch ||
        service.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        service.id
          .toLowerCase()
          .includes(normalizedSearch) ||
        service.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        service.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        service.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "name-desc":
          return b.name.localeCompare(a.name);

        case "category-asc":
          return a.category.localeCompare(
            b.category
          );

        case "status":
          return a.status.localeCompare(
            b.status
          );

        case "name-asc":
        default:
          return a.name.localeCompare(
            b.name
          );
      }
    });
  }, [
    services,
    searchTerm,
    statusFilter,
    sortOption,
  ]);

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Services
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            PiGenesis services and capabilities.
          </p>
        </div>

        {/* Create Service Button */}
        <Link
          to="/services/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-500"
        >
          + Create Service
        </Link>
      </div>

      {/* Search / Filter / Sort */}
      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-5">
        <div className="grid gap-4 md:grid-cols-3">

          {/* Search */}
          <div>
            <label
              htmlFor="service-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search
            </label>

            <input
              id="service-search"
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search services..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="service-status-filter"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="service-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | ServiceStatus
                    | "All"
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="All">
                All
              </option>

              <option value="Planning">
                Planning
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Coming Soon">
                Coming Soon
              </option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="service-sort"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Sort
            </label>

            <select
              id="service-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as ServiceSortOption
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="name-asc">
                Name A–Z
              </option>

              <option value="name-desc">
                Name Z–A
              </option>

              <option value="category-asc">
                Category A–Z
              </option>

              <option value="status">
                Status
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* Service Count */}
      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-300">
            {filteredAndSortedServices.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-300">
            {services.length}
          </span>{" "}
          services
        </p>
      </div>

      {/* Services Grid */}
      {filteredAndSortedServices.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedServices.map(
            (service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group rounded-xl border border-slate-700 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800"
              >
                {/* Service Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-400">
                      {service.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {service.id}
                    </p>
                  </div>

                  <StatusBadge
                    status={service.status}
                  />
                </div>

                {/* Description */}
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                  {service.description}
                </p>

                {/* Service Category */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {service.category}
                  </p>
                </div>

                {/* View Details */}
                <div className="mt-5 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                  View Service →
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        /* Empty / No Results State */
        <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          {services.length === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-white">
                No services yet
              </h2>

              <p className="mt-2 text-slate-400">
                Create your first PiGenesis
                service.
              </p>

              <Link
                to="/services/new"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
              >
                + Create Service
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">
                No matching services
              </h2>

              <p className="mt-2 text-slate-400">
                Try changing your search or
                filter.
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

export default ServicesPage;