import { HelpAreaLinks } from "./help-area-links";
import { Instagram } from "lucide-react";

export function Contact() {
  return (
    <div className="flex gap-48 max-[600px]:flex-col max-[600px]:gap-16">
      <div className="flex flex-col justify-start items-center max-[600px]:items-start gap-2">
        <h5 className="text-gray-base">NOSSAS REDES</h5>

        <div className="flex items-center gap-2">
          <Instagram className="size-7" />
          <a href="https://www.instagram.com/seupetcomavet/">@seupetcomavet</a>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h5 className="text-gray-base">AJUDA E CONTATO</h5>
        <HelpAreaLinks />
      </div>
    </div>
  );
}
