const LOCATIONS_TYPE = ["all", "regional", "international"] as const;
const LOCATIONS = [
  {
    type: "regional",
    label: "Main Headquarters",
    location: "456 Centennial Plaza, New Troy, Metropolis",
    description:
      "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
    contact: {
      email: "metropolis.office@estatein.com",
      phone: "+1 416 555 7890",
      location: {
        name: "Metropolis",
        link: "https://google.com/maps",
      },
    },
  },
  {
    type: "international",
    label: "Regional Offices",
    location: "456 Kensington Gardens, City of Westminster, London",
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    contact: {
      email: "london.office@estatein.com",
      phone: "+44 20 7123 4567",
      location: {
        name: "London",
        link: "https://google.com/maps",
      },
    },
  },
] as const;

export { LOCATIONS, LOCATIONS_TYPE };
