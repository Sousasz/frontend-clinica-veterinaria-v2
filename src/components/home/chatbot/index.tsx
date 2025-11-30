"use client";

import ChatBotIcon from "./chatbot-icon";
import ChatBotHeader from "./chatbot-header";
import ChatBotContent from "./chatbot-content";
import ChatBotResponse from "./chatbot-response";
import ChatBotUserQuestion from "./chatbot-user-question";
import ChatBotInput from "./chatbot-input";
import { useState, useRef, useEffect } from "react";

import pingoImage from "../../../../public/images/pingo.webp";
import Image from "next/image";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://backend-clinica-veterinaria.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages([...newMessages, { role: "bot", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: "bot", content: "⚠️ Não consegui gerar uma resposta." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: "bot",
          content: "❌ Ocorreu um erro ao processar sua mensagem.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onClickIconToChatBot() {
    setIsOpenChat(!isOpenChat);
  }

  function onCloseChatBot() {
    setIsOpenChat(false);
  }

  return (
    <>
      {isOpenChat ? (
        <section className="flex flex-col fixed bottom-0 top-auto right-0 border border-gray-600 max-[680px]:right-auto">
          <div className="bg-white w-[40rem] h-[30rem] max-[680px]:w-[30rem] max-[500px]:w-[25rem] max-[425px]:w-[22rem]">
            <ChatBotHeader onCloseChatBot={onCloseChatBot} />

            <ChatBotContent>
              <div
                ref={chatContentRef}
                className="flex flex-col gap-2 overflow-y-auto h-[22rem]"
              >
                {messages.map((msg, index) =>
                  msg.role === "user" ? (
                    <ChatBotUserQuestion key={index}>
                      {msg.content}
                    </ChatBotUserQuestion>
                  ) : (
                    <div key={index} className="flex gap-3 items-end">
                      <Image
                        className="size-10"
                        src={pingoImage}
                        alt="Imagem do mascote"
                      />

                      <div className="max-w-[80%] bg-white border border-green-light rounded-t-xl rounded-br-xl p-3 text-start shadow-md">
                        <div
                          className="chat-reply"
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      </div>
                    </div>
                  )
                )}

                {loading && <ChatBotResponse>Digitando...</ChatBotResponse>}
              </div>
            </ChatBotContent>

            <ChatBotInput
              value={input}
              setValue={setInput}
              onSend={sendMessage}
            />
          </div>
        </section>
      ) : (
        <ChatBotIcon onClickIconToChatBot={onClickIconToChatBot} />
      )}
    </>
  );
}
