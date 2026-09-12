type LogContext = Record<string, unknown>;

function formatContext(context?: LogContext) {
  if (!context || Object.keys(context).length === 0) {
    return "";
  }

  return context;
}

export function logInfo(
  message: string,
  context?: LogContext
) {
  console.info(
    `[PiGenesis] ${message}`,
    formatContext(context)
  );
}

export function logWarn(
  message: string,
  context?: LogContext
) {
  console.warn(
    `[PiGenesis] ${message}`,
    formatContext(context)
  );
}

export function logError(
  message: string,
  context?: LogContext
) {
  console.error(
    `[PiGenesis] ${message}`,
    formatContext(context)
  );
}