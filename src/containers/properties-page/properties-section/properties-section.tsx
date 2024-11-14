import { getProperties } from "@/server/db/properties";
import { PropertiesCards } from "./properties-cards";

export async function PropertiesSection() {
  const properties = await getProperties();

  return <PropertiesCards properties={properties} />;
}
