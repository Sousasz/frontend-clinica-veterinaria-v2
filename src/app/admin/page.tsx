'use client'

import Title from "@/components/ui/title";
import ConsultsBooked from "./consults/consults-booked";
import ButtonDialog from "@/components/ui/button-dialog";
import { admButtons } from "@/consts/adm-buttons";
import ProtectedRoute from "@/components/protected-route";

export const dynamic = 'force-dynamic';

export default function Admin() {
  return (
    <ProtectedRoute requiredRole="admin">
      <section className="w-full h-full font-poppins">
        <div className="flex flex-col mx-20 my-10 max-[520px]:mx-8 max-[350px]:mx-4 max-[280px]:mx-1  gap-14">
          <div className="flex flex-col gap-10">
            <Title>Setor administrativo</Title>

            <div className="flex flex-col gap-8 w-fit max-[600px]:items-center max-[600px]:w-full">
              {admButtons.map((Button, index) => {
                return (
                  <div key={index}>
                    <ButtonDialog Button={Button} />
                  </div>
                );
              })}
            </div>

            <ConsultsBooked />
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
