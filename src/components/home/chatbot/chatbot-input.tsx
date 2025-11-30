import { FaRegPaperPlane } from "react-icons/fa";

type ChatBotInputProps = {
  value: string;
  setValue: (val: string) => void;
  onSend: () => void;
}

export default function ChatBotInput({ value, setValue, onSend }: ChatBotInputProps) {
  return (
    <form onSubmit={onSend} className="w-full flex border-2 border-t-green-light border-b-white p-3">
      <input
        value={value}
        name="question"
        className="w-full h-full text-black outline-none px-3"
        type="text"
        placeholder="Digite aqui sua mensagem..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="cursor-pointer">
        <FaRegPaperPlane className="size-5" />
      </button>
    </form>
  );
}