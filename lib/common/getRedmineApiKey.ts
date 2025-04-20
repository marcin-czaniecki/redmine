import "@johnlindquist/kit";

export const getRedmineApiKey = async () => {
  return await env("REDMINE_API_KEY", {
    secret: true,
    placeholder: "Podaj klucz Redmine API",
    hint: "Klucz Redmine API możesz znaleźć u siebie w profilu redmine",
  });
};
