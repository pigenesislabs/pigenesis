import { beforeEach, describe, expect, it } from "vitest";
import { createService, getServiceById, getServices, updateService, deleteService } from "./serviceService";

const STORAGE_KEY = "pigenesis_services";

describe("serviceService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads default services when storage is empty", () => {
    const services = getServices();

    expect(services).toHaveLength(3);
    expect(services[0].id).toBe("ai-consulting");
  });

  it("returns all services", () => {
    const services = getServices();

    expect(services).toHaveLength(3);
  });

  it("returns a service by id", () => {
    const service = getServiceById(
      "workflow-automation"
    );

    expect(service).toBeDefined();
    expect(service?.name).toBe(
      "Workflow Automation"
    );
  });

  it("returns undefined for an unknown service", () => {
    const service = getServiceById(
      "unknown-service"
    );

    expect(service).toBeUndefined();
  });

  it("creates a new service", () => {
    const service = createService({
      id: "data-automation",
      name: "Data Automation",
      status: "Planning",
      description:
        "Intelligent data automation services",
      category: "Automation",
    });

    expect(service.id).toBe("data-automation");

    const services = getServices();

    expect(services).toHaveLength(4);
    expect(
      services.some(
        (item) => item.id === "data-automation"
      )
    ).toBe(true);
  });

  it("persists a newly created service", () => {
    createService({
      id: "cloud-solutions",
      name: "Cloud Solutions",
      status: "Active",
      description:
        "Cloud architecture and implementation services",
      category: "Cloud",
    });

    const storedServices =
      localStorage.getItem(STORAGE_KEY);

    expect(storedServices).not.toBeNull();

    const parsedServices = JSON.parse(
      storedServices as string
    );

    expect(parsedServices).toHaveLength(4);
    expect(parsedServices[3].id).toBe(
      "cloud-solutions"
    );
  });

  it("prevents duplicate service ids", () => {
    expect(() =>
      createService({
        id: "ai-consulting",
        name: "Another AI Consulting",
        status: "Planning",
        description:
          "Another consulting service",
        category: "Artificial Intelligence",
      })
    ).toThrow(
      "A service with this ID already exists."
    );
  });

  it("rejects an empty service id", () => {
    expect(() =>
      createService({
        id: "",
        name: "Test Service",
        status: "Planning",
        description: "Test description",
        category: "Technology",
      })
    ).toThrow("Service ID is required.");
  });

  it("rejects an invalid service id", () => {
    expect(() =>
      createService({
        id: "Test_Service",
        name: "Test Service",
        status: "Planning",
        description: "Test description",
        category: "Technology",
      })
    ).toThrow(
      "Service ID can contain only lowercase letters, numbers, and hyphens."
    );
  });

  it("rejects an empty service name", () => {
    expect(() =>
      createService({
        id: "test-service",
        name: "",
        status: "Planning",
        description: "Test description",
        category: "Technology",
      })
    ).toThrow("Service name is required.");
  });

  it("rejects an empty service description", () => {
    expect(() =>
      createService({
        id: "test-service",
        name: "Test Service",
        status: "Planning",
        description: "",
        category: "Technology",
      })
    ).toThrow("Service description is required.");
  });

  it("rejects an empty service category", () => {
    expect(() =>
      createService({
        id: "test-service",
        name: "Test Service",
        status: "Planning",
        description: "Test description",
        category: "",
      })
    ).toThrow("Service category is required.");
  });

  it("rejects an invalid service status", () => {
    expect(() =>
      createService({
        id: "test-service",
        name: "Test Service",
        status: "Invalid" as never,
        description: "Test description",
        category: "Technology",
      })
    ).toThrow("Service status is invalid.");
  });
  it("updates an existing service", () => {
    const updatedService = updateService(
      "ai-consulting",
      {
        name: "Advanced AI Consulting",
        status: "Active",
        description:
          "Advanced AI strategy and intelligent system consulting",
        category: "Artificial Intelligence",
      }
    );

    expect(updatedService).toBeDefined();
    expect(updatedService?.id).toBe(
      "ai-consulting"
    );
    expect(updatedService?.name).toBe(
      "Advanced AI Consulting"
    );
    expect(updatedService?.status).toBe("Active");
  });

  it("persists an updated service", () => {
    updateService(
      "workflow-automation",
      {
        name: "Intelligent Workflow Automation",
        status: "Active",
        description:
          "Advanced business workflow automation",
        category: "Automation",
      }
    );

    const service = getServiceById(
      "workflow-automation"
    );

    expect(service?.name).toBe(
      "Intelligent Workflow Automation"
    );
    expect(service?.status).toBe("Active");
  });

  it("returns undefined when updating a nonexistent service", () => {
    const result = updateService(
      "unknown-service",
      {
        name: "Test Service",
        status: "Planning",
        description: "Test description",
        category: "Technology",
      }
    );

    expect(result).toBeUndefined();
  });

  it("rejects an empty service name during update", () => {
    expect(() =>
      updateService(
        "ai-consulting",
        {
          name: "",
          status: "Planning",
          description: "Test description",
          category: "Technology",
        }
      )
    ).toThrow("Service name is required.");
  });

  it("rejects an empty service description during update", () => {
    expect(() =>
      updateService(
        "ai-consulting",
        {
          name: "AI Consulting",
          status: "Planning",
          description: "",
          category: "Technology",
        }
      )
    ).toThrow(
      "Service description is required."
    );
  });

  it("rejects an empty service category during update", () => {
    expect(() =>
      updateService(
        "ai-consulting",
        {
          name: "AI Consulting",
          status: "Planning",
          description: "Test description",
          category: "",
        }
      )
    ).toThrow(
      "Service category is required."
    );
  });

  it("rejects an invalid service status during update", () => {
    expect(() =>
      updateService(
        "ai-consulting",
        {
          name: "AI Consulting",
          status: "Invalid" as never,
          description: "Test description",
          category: "Technology",
        }
      )
    ).toThrow(
      "Service status is invalid."
    );
  });
    it("deletes an existing service", () => {
    const result = deleteService(
      "ai-consulting"
    );

    expect(result).toBe(true);

    const service = getServiceById(
      "ai-consulting"
    );

    expect(service).toBeUndefined();
  });

  it("returns false when deleting a nonexistent service", () => {
    const result = deleteService(
      "unknown-service"
    );

    expect(result).toBe(false);
  });

  it("persists service deletion", () => {
    deleteService(
      "workflow-automation"
    );

    const services = getServices();

    expect(services).toHaveLength(2);

    expect(
      services.some(
        (service) =>
          service.id === "workflow-automation"
      )
    ).toBe(false);
  });
});