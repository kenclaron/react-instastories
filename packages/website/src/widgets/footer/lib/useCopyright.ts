import { COMMON } from "../../../shared";

export function useCopyright() {
  const currentYear = new Date().getFullYear();

  const years = Array.from(new Set([COMMON.createdAt, currentYear]))
    .filter(Boolean)
    .join(" - ");

  return [COMMON.name, years].join(" © ");
}
