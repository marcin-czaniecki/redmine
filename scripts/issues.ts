// Name: Redmine - Zagadnienia

import "@johnlindquist/kit";

await arg({
  choices: [
    {
      name: "Odczytaj zagadnienia",
      onSubmit: () => {
        run("..\\lib\\modules\\issues\\core\\read_issue.ts");
      },
    },
  ],
});
