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
import { useMedicines, useVaccines } from "@/lib/hooks/useServices";
import Title from "../../ui/title";

type ServiceItem = {
  imgUrl: any;
  type: string;
  name: string;
  description?: string;
  category?: string;
};

export default function ServicesCarousel() {
  const { medicines } = useMedicines();
  const { vaccines } = useVaccines();

  // Monta os serviços dinâmicos
  const services: ServiceItem[] = [
    ...medicines.map((med: any) => ({
      imgUrl: med.type === "injectables-medicines" ? injectableMedicineImage : medicineImage,
      type: med.type === "injectables-medicines" ? "Medicação Injetável" : "Medicação",
      name: med.name,
      description: med.description,
    })),
    ...vaccines.map((vac: any) => ({
      imgUrl: vaccinationImage,
      type: "Vacinação",
      name: vac.name,
      description: vac.description,
      category: vac.type === "for-dogs" ? "Para cães" : "Para gatos",
    })),
  ];

  return (
    <section className="flex flex-col items-center gap-10" id="services">
      <Title>Nossos serviços</Title>
      <Carousel>
        <CarouselContent>
          {services.map((service: ServiceItem, index: number) => (
            <CarouselItem className="basis-1/3 max-w-[90%]" key={index}>
              <CarouselItemContent service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
