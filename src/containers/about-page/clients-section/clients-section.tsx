import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section, SectionTitle } from "@/components/ui/section";
import { CLIENTS } from "@/constant";
import { ClientCard } from "./client-card";

export function ClientsSection() {
  return (
    <Section id="clients" className="space-y-10 md:space-y-12 lg:space-y-15">
      <SectionTitle
        title="Our Valued Clients"
        paragraph="At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've had the pleasure of serving"
      />

      <Carousel
        opts={{
          align: "start",
        }}
        className="flex flex-col gap-7.5"
      >
        <CarouselContent className="md:-ml-5">
          {CLIENTS.map((client) => (
            <CarouselItem key={client.date} className="md:basis-1/2 md:pl-5">
              <ClientCard {...client} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-t-gray-dark pt-4 text-sm min-[450px]:flex-nowrap min-[450px]:justify-normal md:justify-end md:gap-5">
          <CarouselPrevious className="static translate-x-0 translate-y-0 lg:order-2" />
          <CarouselNext className="static translate-x-0 translate-y-0 lg:order-3" />
        </div>
      </Carousel>
    </Section>
  );
}
