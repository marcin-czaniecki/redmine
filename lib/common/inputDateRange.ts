export async function inputDateRange(): Promise<string> {
  return await arg({
    placeholder: "Podaj datę (YYYY-MM-DD) lub zakres dat (YYYY-MM-DD...YYYY-MM-DD)",
    hint: "e.g., 2024-01-01 or 2024-01-01...2024-01-31",
    validate: (input) => {
      if (!input) return "Data jest wymagana.";
      const singleDate = /^\d{4}-\d{2}-\d{2}$/;
      const rangeDate = /^\d{4}-\d{2}-\d{2}\.\.\.\d{4}-\d{2}-\d{2}$/;
      if (singleDate.test(input) || rangeDate.test(input)) return true;
      return "Podaj datę w formacie YYYY-MM-DD lub zakres dat w formacie YYYY-MM-DD...YYYY-MM-DD";
    },
  });
}
