"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CarouselItemContent from "./carousel-item-content";
import medicineImage from "@/../public/images/medicine.webp";
import injectableMedicineImage from "@/../public/images/injectable-medicine.webp";
import vaccinationImage from "@/../public/images/vaccination.webp";
import { useMedicines, useVaccines, MedicineItem, VaccineItem } from "@/lib/hooks/useServices";
import type { StaticImageData } from 'next/image';
import Title from "../../ui/title";

type ServiceItem = {
  imgUrl: StaticImageData | string;
  id?: string;
  type: string;
  name: string;
  description?: string;
  category?: string;
};

export default function ServicesCarousel() {
  const { medicines, loading: medicinesLoading } = useMedicines();
  const { vaccines, loading: vaccinesLoading } = useVaccines();

  // Monta os serviços dinâmicos
  const services: ServiceItem[] = [
    ...medicines.map((med: MedicineItem) => ({
      id: med._id as string | undefined,
      imgUrl: med.type === "injectables-medicines" ? injectableMedicineImage : medicineImage,
      type: med.type === "injectables-medicines" ? "Medicação Injetável" : "Medicação",
      name: med.name || '',
      description: med.description,
    })),
    ...vaccines.map((vac: VaccineItem) => ({
      id: vac._id as string | undefined,
      imgUrl: vaccinationImage,
      type: "Vacinação",
      name: vac.name || '',
      description: vac.description,
      category: vac.type === "for-dogs" ? "Para cães" : "Para gatos",
    })),
  ];

  // Remove duplicates for display only (preserve original data for editing)
  // Prefer deduplication by unique id when available; fall back to type+name key.
  const uniqueServices: ServiceItem[] = (() => {
    const map = new Map<string, ServiceItem>();
    for (const svc of services) {
      const key = svc.id ? svc.id : `${svc.type}:::${svc.name}`;
      if (!map.has(key)) map.set(key, svc);
    }
    return Array.from(map.values());
  })();

  const isLoading = medicinesLoading || vaccinesLoading;

  return (
    <section className="flex flex-col items-center gap-10" id="services">
      <Title>Nossos serviços</Title>
      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <p className="text-gray-500">Carregando serviços...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="w-full h-64 flex items-center justify-center">
          <p className="text-gray-500">Nenhum serviço disponível no momento</p>
        </div>
      ) : (
        <Carousel>
          <CarouselContent>
            {uniqueServices.map((service: ServiceItem, index: number) => (
              <CarouselItem className="basis-1/3 max-w-[90%]" key={service.id ?? `${service.type}-${service.name || index}`}>
                <CarouselItemContent service={service} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </section>
  );
}
