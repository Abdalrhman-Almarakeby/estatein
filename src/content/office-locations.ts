export const OFFICE_TYPES = ["all", "domestic", "international"] as const;

export const OFFICE_LOCATIONS = [
  {
    type: "domestic",
    name: "Global Headquarters",
    address: "456 Centennial Plaza, New Troy, Metropolis",
    description:
      "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
    contact: {
      email: "metropolis@estatein.com",
      phone: "+1 416 555 7890",
      city: {
        name: "Metropolis",
        mapUrl: "https://google.com/maps",
      },
    },
  },
  {
    type: "international",
    name: "London Office",
    address: "456 Kensington Gardens, City of Westminster, London",
    description:
      "Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    contact: {
      email: "london@estatein.com",
      phone: "+44 20 7123 4567",
      city: {
        name: "London",
        mapUrl: "https://google.com/maps",
      },
    },
  },
] as const;
