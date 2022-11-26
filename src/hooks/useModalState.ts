import { useContext } from "react";

import { ModalStateContext } from "../context/ModalContext";

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalProvider");
  }
  return context;
};
