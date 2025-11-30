import pingoImage from "../../../../public/images/pingo.webp";
import Image from "next/image";

type ChatBotResponseProps = {
  children: React.ReactNode;
};

export default function ChatBotResponse({ children, ...rest }: ChatBotResponseProps) {
  return (
    <div className="flex gap-3 items-end">
      <Image className="size-10" src={pingoImage} alt="Imagem do mascote" />

      <div className="max-w-[80%] bg-white border border-green-light rounded-t-xl rounded-br-xl p-3 text-start shadow-md">
        <div {...rest}>{children}</div>
      </div>
    </div>
  );
}