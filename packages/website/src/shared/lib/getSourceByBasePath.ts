export function getSourceByBasePath(src: string) {
  if (!process.env.NEXT_PUBLIC_BASE_PATH) {
    return src;
  }

  return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`;
}

export default getSourceByBasePath;
