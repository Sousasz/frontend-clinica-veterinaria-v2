import avatarImage from "../../../../public/images/avatar.webp";
import Image from "next/image";
import ReactMarkdown from "react-markdown"

type ChatBotUserQuestionProps = {
  children: string | null | undefined;
};

export default function ChatBotUserQuestion({ children }: ChatBotUserQuestionProps) {
  return (
    <div className="flex flex-row-reverse gap-3 items-end">
      <Image className="size-10" src={avatarImage} alt="Foto do usuário" />

      <div className="max-w-[80%] max-h-full bg-green-light border rounded-t-xl rounded-bl-xl p-3 text-start shadow-md">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{children?.replace(/\n(?!\n)/g, '\n\n')}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}