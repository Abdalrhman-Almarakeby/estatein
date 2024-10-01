declare module "*.svg" {
  import { SVGcomponent } from "@/types";
  const component: SVGcomponent;
  export default component;
}

declare module "*.svg?url" {
  import { StaticImageData } from "next/image";
  const image: StaticImageData;
  export default image;
}
