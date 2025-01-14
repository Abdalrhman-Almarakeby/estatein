import { Metadata } from "next";
import { Property } from "@prisma/client";
import { formatPrice, getBaseUrl, normalize, upperFirst } from "@/lib/utils";

type AppPagesMetadataOptions = {
  title: string;
  description: string;
  keywords: string | string[];
  metadata?: Partial<Metadata>;
};

export function generateAppMetadata({
  title,
  description,
  keywords,
  metadata,
}: AppPagesMetadataOptions): Metadata {
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

type PropertyMetadataOptions = Property & {
  metadata?: Partial<Metadata>;
};

export function generatePropertyPageMetadata({
  bedrooms,
  propertyType,
  bathrooms,
  area,
  listingPrice,
  images,
  location,
  description: propertyDescription,
  ...property
}: PropertyMetadataOptions): Metadata {
  const title = `Stunning ${bedrooms}-Bedroom ${upperFirst(normalize(propertyType))} in ${location} - ${bathrooms} Bathrooms | ${area} ft² | Priced at ${formatPrice(listingPrice)}`;

  const description = `${propertyDescription} This stunning ${upperFirst(normalize(propertyType))} features ${bedrooms} bedrooms and ${bathrooms} bathrooms, perfect for families and entertaining guests. Located in the heart of ${location}, this property offers a generous area of ${area} ft², and is priced at ${formatPrice(listingPrice)}.`;

  const keywords = [
    upperFirst(normalize(propertyType)),
    `${bedrooms} bedrooms`,
    `${bathrooms} bathrooms`,
    location,
    ...location.split(", "),
    "real estate",
    "property for sale",
    "house",
    "villa",
    "luxury property",
    "home listing",
    "buy property",
    "mortgage",
    "investment property",
  ];

  return generateAppMetadata({
    title,
    description,
    keywords,
    metadata: {
      openGraph: {
        images,
      },
      ...property.metadata,
    },
  });
}

type DashboardPagesMetadataOptions = {
  title: string;
  description: string;
  metadata?: Partial<Metadata>;
};

export function generateDashboardMetadata({
  title,
  description,
  metadata,
}: DashboardPagesMetadataOptions): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    ...metadata,
  };
}
