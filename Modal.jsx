import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }) {
  const modal = useRef(null);

  if (modal.current === null) {
    modal.current = document.createElement("div");
    modal.current.classList.add("modal");
  }

  useEffect(() => {
    const root = document.getElementById("modals");
    root.appendChild(modal.current);

    return () => root.removeChild(modal.current);
  }, []);

  return createPortal(children, modal.current);
}
