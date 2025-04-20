export function getRedmineUrl() {
  return env("REDMINE_URL", {
    secret: true,
    placeholder: "Podaj adres Redmine",
    hint: "Adres Redmine powinien wyglądać tak: https://redmine.example.com",
  });
}
