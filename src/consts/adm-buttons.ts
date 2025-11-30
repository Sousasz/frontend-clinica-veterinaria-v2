import { GoPencil } from "react-icons/go";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";

type admButtonProps = {
    type: string,
    text: string;
    icon: IconType
}[]

export const admButtons:admButtonProps = [
    {
        type: "Medicamento",
        text: "Editar medicamentos utilizados",
        icon: GoPencil,
    },
    {
        type: "Vacina",
        text: "Editar vacinas utilizadas",
        icon: GoPencil,
    },
    {
        type: "Avaliação",
        text: "Ver avaliações",
        icon: LiaCommentDotsSolid,
    },
]