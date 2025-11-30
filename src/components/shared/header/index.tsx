"use client";

import { CallToAction } from "./call-to-action";
import { AlignJustify } from "lucide-react";
import logo from "@/assets/logo.webp";
import Image from "next/image";
import UserSignIn from "@/modals/user-signin";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

import { useState } from "react";

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function onClickToOpenTheMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  const { user } = useAuth();

  return (
    <>
      <header className="flex justify-between items-center py-5 px-10 ">
        <div className="flex justify-center items-center gap-10">
          <Image
            priority
            className="w-20"
            src={logo}
            alt="Logo da clínica - Cachorro"
          />
          <nav className="hidden xl:block">
            <ul className="flex gap-10">
              <li>
                <Link href="/#home">Home</Link>
              </li>

              <li>
                <Link href="/#services">Nossos serviços</Link>
              </li>

              <li>
                <Link href="/#booking">Agendamento</Link>
              </li>

              <li>
                <Link href="/#rating">Nossas avaliações</Link>
              </li>

              <li>
                <Link href="/#areas">Áreas atendidas</Link>
              </li>

              <li>
                {user?.role === "admin" && <Link href="/admin">Admin</Link>}
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-10">
            <UserSignIn />

            <button
              onClick={onClickToOpenTheMenu}
              className="cursor-pointer xl:hidden block"
            >
              <AlignJustify className="size-10  " />
            </button>
          </div>

          {isOpenMenu ? (
            <>
              <div className="w-full flex justify-end xl:hidden">
                <ul className="bg-white border border-b-black border-l-black border-white p-3 flex flex-col gap-5 bottom-0 top-[6.5rem] right-0 absolute z-1 h-80">
                  <li>
                    <Link href="/#home">Home</Link>
                  </li>

                  <li>
                    <Link href="/#services">Nossos serviços</Link>
                  </li>

                  <li>
                    <Link href="/#booking">Agendamento</Link>
                  </li>

                  <li>
                    <Link href="/#rating">Nossas avaliações</Link>
                  </li>

                  <li>
                    <Link href="/#areas">Áreas atendidas</Link>
                  </li>

                  <li>
                    {user?.role === "admin" && <Link href="/admin">Admin</Link>}
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </header>

      <CallToAction />
    </>
  );
}
