import Title from "@/components/ui/title";
import RegionsToSevice from "../regions/regions-to-service";

export default function Regions() {
  return (
    <section className="flex flex-col items-center gap-10" id="areas">
      <Title>Áreas atendidas</Title>
      <RegionsToSevice />
    </section>
  );
}