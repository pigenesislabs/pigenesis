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

function StatusText({ status }: Props) {
  const styles = {
    Active: "text-green-400",
    Planning: "text-blue-400",
    "Coming Soon": "text-purple-400",
    Completed: "text-red-300",
  };

  return (
    <p
      className={`mt-3 text-2xl font-semibold ${styles[status]}`}
    >
      {status}
    </p>
  );
}

export default StatusText;