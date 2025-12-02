import Image from "next/image";
import joycePhoto from "../../../../public/images/joyce-photo.webp"


export default function About() {
  return (
    <div className="flex max-[855px]:flex-col max-[855px]:items-center gap-10">
      <Image
        className="shadow-default"
        src={joycePhoto}
        alt="Imagem da Doutora Joyce"
      />
      <p className="max-w-[536px] text-shadow-2xs">
        Desde cedo, a paixão e o amor incondicional pelos animais definiram a
        vocação da Dra. Joyce, que nunca considerou outra carreira. Com uma
        formação sólida, sua jornada começou com o curso técnico em Veterinária
        (2012-2013), estabelecendo as bases de seu conhecimento. Em 2015, ingressou
        na Universidade Paulista (UNIP-SP), concluindo sua graduação em 202. 
        Atualmente, a Dra. joyce é uma profissional dedicada à Clinica Geral,
        garantindo o bem-estar e saúde preventiva dos seus pets. Sua expertise é
        completada por uma especialização em técnicas cirurgícas de cães e gatos,
        o que qualifica a oferecer um cuidado completo e de alta precisão no conforto
        do seu lar.
      </p>
    </div>
  );
}