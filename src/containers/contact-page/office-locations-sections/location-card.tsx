import { Mail, MapPin, Phone } from "lucide-react";

type LocationCardProps = {
  label: string;
  location: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    location: {
      name: string;
      link: string;
    };
  };
};

export function LocationCard({
  label,
  location,
  description,
  contact,
}: LocationCardProps) {
  return (
    <div
      className="flex flex-col rounded-lg border p-6 lg:p-10"
      role="region"
      aria-label={label}
    >
      <div className="mb-auto">
        <p className="text-secondary">{label}</p>
        <p className="mt-1 text-xl font-semibold lg:mt-1.5 lg:text-2xl 3xl:mt-2.5 3xl:text-3xl">
          {location}
        </p>
        <p className="text-primary mt-1 lg:mt-2.5 3xl:mt-3.5">{description}</p>
      </div>
      <div className="badges-container mt-6 lg:mt-7.5">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 rounded-3xl border bg-gray-darker px-3.5 py-[0.40625rem]"
          aria-label={`Email ${contact.email}`}
        >
          <Mail aria-hidden="true" className="size-4 text-purple-light" />{" "}
          {contact.email}
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="flex items-center gap-2 rounded-3xl border bg-gray-darker px-3.5 py-[0.40625rem]"
          aria-label={`Call ${contact.phone}`}
        >
          <Phone aria-hidden="true" className="size-4 text-purple-light" />{" "}
          {contact.phone}
        </a>
        <a
          href={contact.location.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-3xl border bg-gray-darker px-3.5 py-[0.40625rem]"
          aria-label={`View location of our office in ${contact.location.name}`}
        >
          <MapPin aria-hidden="true" className="size-4 text-purple-light" />{" "}
          {contact.location.name}
        </a>
      </div>
      <a
        href={contact.location.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Get directions to our office in ${location}`}
        className="btn-primary btn-sm 3xl:btn-lg mt-6 block text-center lg:mt-7.5 lg:text-base"
      >
        Get Directions
      </a>
    </div>
  );
}
