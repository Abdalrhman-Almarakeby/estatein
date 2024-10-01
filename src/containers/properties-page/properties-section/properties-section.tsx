import { getProperties } from "@/lib/utils";
import { PropertiesCards } from "./properties-cards";

export async function PropertiesSection() {
  const properties = await getProperties();

  return <PropertiesCards properties={properties} />;
}
