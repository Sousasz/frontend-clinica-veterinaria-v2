import { Contact } from "./contact";
import { DevelopmentCompany } from "./development-company";
import logo from "../../../assets/logo.webp";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col p-14 mt-22">
      <section className="flex justify-between max-[1105px]:flex-col max-[1105px]:items-center">
        <div className="flex gap-5 justify-center items-center h-fit max-[600px]:py-10">
          <Image
            src={logo}
            alt="Logo da clínica veterinária - Cachorro"
            className="size-16"
          />
          <p>Veterinaria Dra. Joyce Oliveira</p>
        </div>

        <Contact />
      </section>

      <DevelopmentCompany />
    </footer>
  );
}
