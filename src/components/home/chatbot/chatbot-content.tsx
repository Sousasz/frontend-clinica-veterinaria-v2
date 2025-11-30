
type ChatBotContentProps = {
  children: React.ReactNode
}

export default function ChatBotContent({ children }: ChatBotContentProps) {
  return (
    <section className="flex flex-col w-full h-[350px] p-4 py-8 overflow-y-auto overflow-x-hidden gap-10">
      {children}
    </section>
  )
}