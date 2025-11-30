import companyImage from "../../../../public/images/company.webp";
import Image from "next/image";

export function DevelopmentCompany() {
  return (
    <section className="pt-10 flex flex-col justify-center items-center">
      <p className="text-lg text-center">
        Desenvolvido por{" "}
        <a href="#" className="underline">
          Devise
        </a>
      </p>
      <Image src={companyImage} className="w-20" alt="Logo da empresa Devise" />
    </section>
  );
}