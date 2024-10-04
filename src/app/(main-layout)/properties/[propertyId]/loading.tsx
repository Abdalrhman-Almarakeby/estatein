export default function Loading() {
  return (
    <main className="page-spacing container flex-grow bg-gray-darkest py-15 text-white">
      <HeroSectionSkeleton />
    </main>
  );
}

function HeroSectionSkeleton() {
  return (
    <section className="grid gap-5 lg:gap-7.5 xl:grid-cols-2">
      <div className="space-y-7.5 lg:space-y-10 xl:col-span-2">
        <HeadingSkeleton />
        <ImagesCarouselSkeleton />
      </div>
      <PropertyDescriptionSkeleton />
      <PropertyFeaturesSkeleton />
    </section>
  );
}

function HeadingSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-4 xl:gap-5">
      <div className="h-8 basis-full animate-pulse rounded bg-gray-dark sm:h-10 md:w-1/2 md:basis-auto" />
      <div className="order-last flex h-10 w-32 animate-pulse items-center gap-1 rounded-md bg-gray-dark xs:order-none md:mr-auto md:self-end" />
      <div className="flex basis-full flex-col gap-1 xs:basis-0 md:gap-0.5">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-dark" />
        <div className="h-6 w-24 animate-pulse rounded bg-gray-dark" />
      </div>
    </div>
  );
}

function ImagesCarouselSkeleton() {
  return (
    <div className="grid gap-5 rounded-xl border border-gray-dark bg-gray-darker p-5 lg:p-10 lg:pb-5 2xl:gap-7.5 2xl:p-12.5 2xl:pb-5">
      <div className="grid md:grid-cols-2 md:gap-7.5">
        <div className="aspect-[31/21] w-full animate-pulse rounded-lg bg-gray-dark" />
        <div className="hidden aspect-[31/21] w-full animate-pulse rounded-lg bg-gray-dark md:block" />
      </div>
      <div className="grid grid-cols-4 grid-rows-[1fr_0_0_0_0] gap-x-2.5 overflow-hidden sm:grid-cols-6 md:grid-cols-8 lg:order-first 2xl:grid-cols-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[31/21] w-full animate-pulse rounded-md bg-gray-dark"
          />
        ))}
      </div>
      <div className="flex items-center justify-between rounded-full bg-gray-darkest p-2 md:gap-4 md:justify-self-center">
        <div className="size-8 animate-pulse rounded-full bg-gray-dark" />
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="h-[3px] w-3 rounded-full bg-gray-medium" />
          ))}
        </div>
        <div className="size-8 animate-pulse rounded-full bg-gray-dark" />
      </div>
    </div>
  );
}

function PropertyDescriptionSkeleton() {
  return (
    <div className="space-y-5 rounded-[10px] border border-gray-dark p-5 sm:space-y-7.5 sm:p-7.5 xl:space-y-10 xl:self-start xl:p-10 3xl:space-y-12.5 3xl:p-12.5">
      <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 2xl:space-y-3.5">
        <div className="h-6 w-1/4 animate-pulse rounded bg-gray-dark sm:h-7 lg:h-8 2xl:h-9" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-dark" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-dark" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-dark" />
      </div>
      <div className="grid gap-5 border-t border-gray-dark pt-5 sm:grid-cols-3">
        <div className="grid grid-cols-2 gap-5 sm:col-span-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-1">
                <div className="h-5 w-5 animate-pulse rounded bg-gray-dark" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-dark" />
              </div>
              <div className="h-6 w-12 animate-pulse rounded bg-gray-dark" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 animate-pulse rounded bg-gray-dark" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-dark" />
          </div>
          <div className="h-6 w-24 animate-pulse rounded bg-gray-dark" />
        </div>
      </div>
    </div>
  );
}

function PropertyFeaturesSkeleton() {
  return (
    <div className="space-y-5 rounded-[10px] border border-gray-dark p-5 sm:space-y-7.5 sm:p-7.5 xl:space-y-10 xl:p-10 3xl:space-y-12.5 3xl:p-12.5">
      <div className="h-6 w-1/2 animate-pulse rounded bg-gray-dark sm:h-7 lg:h-8 2xl:h-9" />
      <div className="grid gap-4.5 lg:gap-5 xl:gap-6 3xl:gap-7.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 border-l border-purple-base bg-gradient-1 px-3 py-2.5"
          >
            <div className="h-4.5 w-4.5 animate-pulse rounded bg-gray-dark" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-dark" />
          </div>
        ))}
      </div>
    </div>
  );
}
