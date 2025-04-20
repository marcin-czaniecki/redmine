export async function inputDate() {
  const dateInput = await arg({
    placeholder: "Podaj datę (pozostaw puste, aby użyć dzisiejszej)",
    hint: "Data w formacie YYYY-MM-DD lub puste dla dzisiaj",
    validate: (input) => {
      if (!input) return true;
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(input) || "Data musi być w formacie YYYY-MM-DD";
    },
  });

  return dateInput && dateInput.trim() ? dateInput : new Date().toISOString().slice(0, 10);
}
