import medicineImage from "../../public/images/medicine.webp"
import clinicalConsult from "../../public/images/clinical-consultation.webp"
import injectableMedicine from "../../public/images/injectable-medicine.webp"
import preventiveConsult from "../../public/images/preventive-consultation.webp"
import vaccinationImage from "../../public/images/vaccination.webp"
import { StaticImageData } from "next/image"


type CarouselProps = {
  imgUrl: StaticImageData,
  type: string
}[]

export const carousel: CarouselProps = [
  {
    imgUrl: medicineImage,
    type: "Medicação"
  },
  {
    imgUrl: clinicalConsult,
    type: "Consulta Clínica"
  },
  {
    imgUrl: injectableMedicine,
    type: "Medicação Injetável"
  },
  {
    imgUrl: preventiveConsult,
    type: "Consulta Preventiva"
  },
  {
    imgUrl: vaccinationImage,
    type: "Vacinação"
  },
]