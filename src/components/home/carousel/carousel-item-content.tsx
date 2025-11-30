import { JSX } from "react";
import NoInjectablesMedicineModal from "@/modals/noinjectables-medicines";
import InjectablesMedicineModal from "@/modals/injectables-medicines";
import VaccinesModal from "@/modals/vaccines";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import Image, { StaticImageData } from "next/image";

type Service = {
  imgUrl: StaticImageData;
  type: string;
};

type CarouselItemContentProps = {
  service: Service;
};

const modalComponents: Record<string, JSX.Element> = {
  Medicação: <NoInjectablesMedicineModal />,
  "Medicação Injetável": <InjectablesMedicineModal />,
  Vacinação: <VaccinesModal />,
};

export default function CarouselItemContent({
  service,
}: CarouselItemContentProps) {
  const ModalComponent = modalComponents[service.type] || null;

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <button className="cursor-pointer">
              <div className="flex justify-center items-center">
                <Image
                  src={service.imgUrl}
                  alt={`Imagem do serviço ${service.type}`}
                />
                <span className="break-words max-w-[30%] text-white text-center text-2xl max-[640px]:text-lg max-[463px]:text-sm font-bold absolute -tracking-[-0.15rem]">
                  {service.type}
                </span>
              </div>
            </button>
          </DialogTrigger>

          {ModalComponent}
        </form>
      </Dialog>
    </>
  );
}
