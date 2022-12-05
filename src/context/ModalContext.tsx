import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

export type ModalType = "IMAGE_UPLOAD_SUCCESS" | "IMAGE_UPLOAD_ERROR";

interface BasicModalData {
  modalType: ModalType;
}

export interface ImageUploadSuccessModalData extends BasicModalData {
  modalType: "IMAGE_UPLOAD_SUCCESS";
  shareableURL: string;
}

export interface ImageUploadErrorModalData extends BasicModalData {
  modalType: "IMAGE_UPLOAD_ERROR";
  errorMessage: string;
}

export class ModalState {
  isVisible = false;
  modalData?: ImageUploadSuccessModalData | ImageUploadErrorModalData;

  constructor() {
    makeAutoObservable(this);
  }

  showModal(
    modalData: ImageUploadSuccessModalData | ImageUploadErrorModalData
  ) {
    this.isVisible = true;
    this.modalData = modalData;
  }

  hideModal() {
    this.isVisible = false;
    this.modalData = undefined;
  }
}

export const ModalContext = createContext<ModalState | undefined>(undefined);

export const ModalProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ModalContext.Provider value={new ModalState()}>
      {children}
    </ModalContext.Provider>
  );
};
