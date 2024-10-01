import { Metadata } from "next";
import { Property } from "@prisma/client";
import { formatPrice, getBaseUrl, upperFirst } from "@/lib/utils";

type PageMetadataOptions = {
  title: string;
  description: string;
  keywords: string | string[];
  metadata?: Partial<Metadata>;
};

export function generateMetadata({
  title,
  description,
  keywords,
  metadata,
}: PageMetadataOptions): Metadata {
  const appName = "Estatein";
  const url = getBaseUrl();

  return {
    applicationName: appName,
    metadataBase: new URL(url),
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    publisher: appName,
    authors: {
      name: appName,
      url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
    twitter: {
      title,
      description,
    },
    ...metadata,
  };
}

export function generatePropertyPageMetadata(
  property: Property,
  metadata?: Partial<Metadata>,
) {
  const title = `Stunning ${property.bedrooms}-Bedroom ${upperFirst(property.propertyType)} in ${property.location} - ${property.bathrooms} Bathrooms | ${property.area} ft² | Priced at ${formatPrice(property.listingPrice)}`;
  const description = `${property.description} This stunning ${upperFirst(property.propertyType)} features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms, perfect for families and entertaining guests. Located in the heart of ${property.location}, this property offers a generous area of ${property.area} ft², and is priced at ${formatPrice(property.listingPrice)}.`;

  const keywords = [
    upperFirst(property.propertyType),
    `${property.bedrooms} bedrooms`,
    `${property.bathrooms} bathrooms`,
    property.location,
    ...property.location.split(", "),
    "real estate",
    "property for sale",
    "house",
    "villa",
    "luxury property",
    "real estate",
    "property for sale",
    "home listing",
    "buy property",
    "mortgage",
    "investment property",
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    metadata: {
      openGraph: {
        images: property.images,
      },
      ...metadata,
    },
  });
}
