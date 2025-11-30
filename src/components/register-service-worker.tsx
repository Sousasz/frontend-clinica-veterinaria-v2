"use client";
import { useEffect } from "react";

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js") // caminho do SW
          .then((registration) => {
            console.log("Service Worker registrado:", registration);
          })
          .catch((err) => {
            console.error("Falha ao registrar SW:", err);
          });
      });
    }
  }, []);

  return null;
}
