'use client'

import avatarImage from "../../../../public/images/avatar.webp";
import Rating from "react-rating";
import Touchable from "@/components/ui/touchable";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import RatingsModal from "@/modals/ratings";

export default function ClientsRating() {
  return (
    <section className="flex flex-col justify-center gap-5" id="rating">
      <div className="flex gap-4">
        <Image
          className="h-min w-28 rounded-full"
          src={avatarImage}
          alt="Imagem do cliente"
        />

        <div className="flex flex-col gap-2">
          <Rating
            initialRating={4}
            emptySymbol={<FaRegStar className="size-5 text-gray-200" />}
            fullSymbol={<FaStar className="size-5 text-amber-300" />}
            readonly
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            temporibus beatae quae similique dolor veritatis tempora hic ipsam,
            exercitationem vero, iusto aut sit vitae eligendi consequatur facere
            aliquam quibusdam in vel cupiditate possimus nesciunt expedita at?
            Molestias sunt adipisci, impedit ad nulla ab repudiandae sapiente
            omnis quas hic in fugit!
          </p>
        </div>
      </div>

      <Dialog>
        <form className="flex justify-center">
          <DialogTrigger asChild>
            <Touchable buttonType="secondary">Ver mais avaliações</Touchable>
          </DialogTrigger>

          <RatingsModal />
        </form>
      </Dialog>
    </section>
  );
}
