import {
  createContext,
  useReducer,
  PropsWithChildren,
  useCallback,
  FunctionComponent,
} from "react";

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

export interface ModalState {
  isVisible: boolean;
  modalData?: ImageUploadSuccessModalData | ImageUploadErrorModalData;
}

export interface ModalActions {
  showModal: (data: ModalState) => void;
  hideModal: () => void;
}

export const ModalStateContext = createContext<ModalState | undefined>(
  undefined
);
export const ModalActionsContext = createContext<ModalActions | undefined>(
  undefined
);

const modalReducer = (
  currentState: ModalState,
  action: { payload?: Partial<ModalState> }
): ModalState => ({ ...currentState, ...action.payload });

const initialState: ModalState = {
  isVisible: false,
  modalData: undefined,
};

export const ModalProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const showModal = (data: ModalState) => {
    dispatch({
      payload: {
        isVisible: true,
        modalData: data.modalData,
      },
    });
  };

  const hideModal = () => {
    dispatch({
      payload: initialState,
    });
  };

  const actions: ModalActions = {
    showModal: useCallback(showModal, []),
    hideModal: useCallback(hideModal, []),
  };

  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionsContext.Provider value={actions}>
        {children}
      </ModalActionsContext.Provider>
    </ModalStateContext.Provider>
  );
};
