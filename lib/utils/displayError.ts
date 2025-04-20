export function displayError(error: unknown) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return div(
    md(`## Redmine API Error
        ${errorMessage}`)
  );
}
