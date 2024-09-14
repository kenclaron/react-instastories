import pkg from "../../../../../package.json";

export function useAuthorLinkMailto() {
  if (!pkg) throw new Error("File package.json is not defined");
  if (!pkg.author?.email) throw new Error("Author's email is not defined");

  return `mailto://${pkg.author.email}`;
}

export default useAuthorLinkMailto;
