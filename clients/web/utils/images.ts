import { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src[0] === "/" ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

export { cloudflareLoader };
