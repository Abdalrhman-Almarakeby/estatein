import { getPropertiesSummaries } from "@/server/db/properties";
import { PropertiesCards } from "./properties-cards";

export async function PropertiesSection() {
  const properties = await getPropertiesSummaries();

  return <PropertiesCards properties={properties} />;
}
