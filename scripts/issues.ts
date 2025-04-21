// Name: Redmine - Zagadnienia

import "@johnlindquist/kit";

await arg({
  choices: [
    {
      name: "Odczytaj zagadnienie",
      onSubmit: () => {
        run("..\\lib\\modules\\issues\\core\\read_issue.ts");
      },
    },
    {
      name: "Dodaj zagadnienie",
      onSubmit: () => {
        run("..\\lib\\modules\\issues\\core\\add_issue.ts");
      },
    },
  ],
});
