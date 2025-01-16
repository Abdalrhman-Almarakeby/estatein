declare module "*.svg" {
  import { SVGComponent } from "@/types";
  const component: SVGComponent;
  export default component;
}

declare module "*.svg?url" {
  import { StaticImageData } from "next/image";
  const image: StaticImageData;
  export default image;
}
