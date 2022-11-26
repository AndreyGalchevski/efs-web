import { useContext } from "react";

import { ModalActionsContext } from "../context/ModalContext";

export const useModalActions = () => {
  const context = useContext(ModalActionsContext);
  if (context === undefined) {
    throw new Error("useModalActions must be used within a ModalProvider");
  }
  return context;
};
