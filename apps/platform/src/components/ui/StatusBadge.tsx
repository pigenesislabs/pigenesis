import type {
  ProjectStatus,
} from "../../types/project";

import type {
  ProductStatus,
} from "../../types/product";

import type {
  ServiceStatus,
} from "../../types/service";

type Status =
  | ProjectStatus
  | ProductStatus
  | ServiceStatus;

type Props = {
  status: Status;
};

function StatusBadge({ status }: Props) {
  const styles = {
    Active: "bg-green-600 text-white",
    Planning: "bg-blue-600 text-white",
    "Coming Soon": "bg-purple-600 text-white",
    Completed: "bg-red-600 text-white",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;