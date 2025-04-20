// Name: Czas pracy Redmine

import "@johnlindquist/kit";

// YYYY-MM-DD

await arg({
  placeholder: "Wybierz zadanie",
  choices: [
    {
      name: "Dodaj dzisiejszy czas pracy",
      shortcut: "d",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\add_time_entries.ts", new Date().toISOString().slice(0, 10));
      },
    },
    {
      name: "Dodaj czas pracy",
      shortcut: "p",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\add_time_entries.ts");
      },
    },
    {
      name: "Odczytaj czas pracy",
      shortcode: "r",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\read_time_entries.ts");
      },
    },
  ],
});
