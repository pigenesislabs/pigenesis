import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getServices,
} from "../services/serviceService";

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

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<ServiceStatus | "All">("All");

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

  const filteredAndSortedServices = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    const filtered = services.filter(
      (service) => {
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

        return (
          matchesSearch && matchesStatus
        );
      }
    );

    return [...filtered].sort(
      (a, b) => {
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
      }
    );
  }, [
    services,
    searchTerm,
    statusFilter,
    sortOption,
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Services
          </h1>

          <p className="mt-4 text-xl text-slate-400">
            PiGenesis services and capabilities.
          </p>
        </div>

        <Link
          to="/services/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-500"
        >
          + Create Service
        </Link>
      </div>

      {/* Search / Filter / Sort */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        {/* Search */}

        <div>
          <label
            htmlFor="service-search"
            className="block text-sm font-medium text-slate-300"
          >
            Search Services
          </label>

          <input
            id="service-search"
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search services..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}

        <div>
          <label
            htmlFor="service-status-filter"
            className="block text-sm font-medium text-slate-300"
          >
            Filter by Status
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
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
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
            className="block text-sm font-medium text-slate-300"
          >
            Sort Services
          </label>

          <select
            id="service-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(
                event.target.value as ServiceSortOption
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="name-asc">
              Name A → Z
            </option>

            <option value="name-desc">
              Name Z → A
            </option>

            <option value="category-asc">
              Category A → Z
            </option>

            <option value="status">
              Status
            </option>
          </select>
        </div>
      </div>

      {/* Result Count */}

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

      {/* Services */}

      {filteredAndSortedServices.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No Services Found
          </h2>

          <p className="mt-3 text-slate-400">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filteredAndSortedServices.map(
            (service) => (
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
                      {service.id}
                    </p>
                    <p className="mt-3 text-slate-400">
                      {service.description}
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                      {service.category}
                    </p>
                  </div>

                  <StatusBadge
                    status={service.status}
                  />
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ServicesPage;