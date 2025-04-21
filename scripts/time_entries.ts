// Name: Redmine - Czas pracy

import "@johnlindquist/kit";

await arg({
  choices: [
    {
      name: "Dodaj dzisiejszy czas pracy",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\add_time_entries.ts", new Date().toISOString().slice(0, 10));
      },
    },
    {
      name: "Dodaj czas pracy",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\add_time_entries.ts");
      },
    },
    {
      name: "Odczytaj czas pracy",
      onSubmit: () => {
        run("..\\lib\\modules\\timeEntries\\core\\read_time_entries.ts");
      },
    },
  ],
});
