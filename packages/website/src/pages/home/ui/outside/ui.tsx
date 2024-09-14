import {
  useClearHash,
  useRootMobileClass,
  useTransparentHeader
} from "../../lib";

export function Outside() {
  useClearHash();
  useRootMobileClass();
  useTransparentHeader();

  return null;
}

export default Outside;
