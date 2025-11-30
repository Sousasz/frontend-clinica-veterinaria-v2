import pingoQuestionsImage from "../../../../public/images/pingo-questions.webp";
import Image from "next/image";

type ChatBotIconProps = {
  onClickIconToChatBot: () => void;
};

export default function ChatBotIcon({ onClickIconToChatBot }: ChatBotIconProps) {
  return (
    <button
      onClick={onClickIconToChatBot}
      className="fixed bottom-0 top-auto right-0 p-4 cursor-pointer"
    >
      <Image
        className="rounded-full w-14"
        src={pingoQuestionsImage}
        alt="Imagem do pet do atendimento ao chatbot"
      />
    </button>
  )
}