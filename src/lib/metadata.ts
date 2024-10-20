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
  {
    bedrooms,
    propertyType,
    bathrooms,
    area,
    listingPrice,
    images,
    location,
    ...property
  }: Property,
  metadata?: Partial<Metadata>,
) {
  const title = `Stunning ${bedrooms}-Bedroom ${upperFirst(
    propertyType,
  )} in ${location} - ${bathrooms} Bathrooms | ${
    area
  } ft² | Priced at ${formatPrice(listingPrice)}`;

  const description = `${property.description} This stunning ${upperFirst(
    propertyType,
  )} features ${bedrooms} bedrooms and ${
    bathrooms
  } bathrooms, perfect for families and entertaining guests. Located in the heart of ${
    location
  }, this property offers a generous area of ${
    area
  } ft², and is priced at ${formatPrice(listingPrice)}.`;

  const keywords = [
    upperFirst(propertyType),
    `${bedrooms} bedrooms`,
    `${bathrooms} bathrooms`,
    location,
    ...location.split(", "),
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
        images: images,
      },
      ...metadata,
    },
  });
}
