import type {
  CreateServiceInput,
  Service,
} from "../types/service";

const STORAGE_KEY = "pigenesis_services";

function validateServiceInput(
  input: CreateServiceInput
): void {
  const serviceId = input.id.trim();

  if (!serviceId) {
    throw new Error("Service ID is required.");
  }

  if (!/^[a-z0-9-]+$/.test(serviceId)) {
    throw new Error(
      "Service ID can contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!input.name.trim()) {
    throw new Error("Service name is required.");
  }

  if (!input.description.trim()) {
    throw new Error("Service description is required.");
  }

  if (!input.category.trim()) {
    throw new Error("Service category is required.");
  }

  const validStatuses: Service["status"][] = [
    "Planning",
    "Active",
    "Coming Soon",
  ];

  if (!validStatuses.includes(input.status)) {
    throw new Error("Service status is invalid.");
  }
}

const defaultServices: Service[] = [
  {
    id: "ai-consulting",
    name: "AI Consulting",
    status: "Planning",
    description:
      "AI strategy and intelligent system consulting",
    category: "Artificial Intelligence",
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    status: "Planning",
    description:
      "Intelligent business workflow automation",
    category: "Automation",
  },
  {
    id: "digital-solutions",
    name: "Digital Solutions",
    status: "Coming Soon",
    description:
      "Custom digital solutions for organizations",
    category: "Technology",
  },
];

function loadServices(): Service[] {
  const storedServices =
    localStorage.getItem(STORAGE_KEY);

  if (!storedServices) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultServices)
    );

    return defaultServices;
  }

  try {
    return JSON.parse(storedServices) as Service[];
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultServices)
    );

    return defaultServices;
  }
}

export let services: Service[] = loadServices();

export function getServices(): Service[] {
  services = loadServices();
  return services;
}

export function getServiceById(
  serviceId: string
): Service | undefined {
  const currentServices = loadServices();

  return currentServices.find(
    (service) => service.id === serviceId
  );
}

export function createService(
  input: CreateServiceInput
): Service {
  validateServiceInput(input);

  const currentServices = loadServices();

  if (
    currentServices.some(
      (service) => service.id === input.id
    )
  ) {
    throw new Error(
      "A service with this ID already exists."
    );
  }

  const service: Service = {
    id: input.id,
    name: input.name,
    status: input.status,
    description: input.description,
    category: input.category,
  };

  const updatedServices = [
    ...currentServices,
    service,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedServices)
  );

  services = updatedServices;

  window.dispatchEvent(
    new Event("pigenesis-services-updated")
  );

  return service;
}