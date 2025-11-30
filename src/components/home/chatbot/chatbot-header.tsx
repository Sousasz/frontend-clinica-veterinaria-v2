import { IoMdClose } from "react-icons/io";
import pingoImage from "@/../public/images/pingo.webp"
import Image from "next/image";

type ChatBotHeaderProps = {
  onCloseChatBot: () => void;
};

export default function ChatBotHeader({ onCloseChatBot }: ChatBotHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-2 items-center">
          <Image src={pingoImage} alt="Imagem do pet do atendimento ao chatbot" />
          <span className="block font-bold text-xl">Pingo</span>
        </div>

        <button className="cursor-pointer" onClick={onCloseChatBot}>
          <IoMdClose className="size-8" />
        </button>
      </div>

      <span className="w-full h-0.5 bg-gray-400 block" />
    </div>
  );
}