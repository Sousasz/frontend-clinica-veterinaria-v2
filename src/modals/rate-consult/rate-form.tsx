'use client'

import Touchable from "@/components/ui/touchable";
import { Textarea } from "@/components/ui/textarea";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function RateForm() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 font-poppins">
      <div className="flex flex-col w-full">
        <p className="underline">Como você avalia o atendimento?</p>
        <Rating
          initialRating={0}
          emptySymbol={<FaRegStar className="size-5 text-gray-500" />}
          fullSymbol={<FaStar className="size-5 text-amber-300" />}
        />
      </div>

      <div className="w-full">
        <Textarea className="w-full" />
      </div>

      <Touchable>Publicar</Touchable>
    </div>
  );
}
