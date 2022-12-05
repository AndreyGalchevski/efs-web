import { Modal, Box, SxProps, Button } from "@mui/material";
import { observer } from "mobx-react-lite";

import useModal from "../../hooks/useModal";
import ImageUploadError from "./variants/ImageUploadError";
import ImageUploadSuccess from "./variants/ImageUploadSuccess";

export const modalContentsStyle: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const SystemModal = observer(() => {
  const modalState = useModal();

  const handleModalClose = () => {
    modalState.hideModal();
  };

  if (!modalState.isVisible || !modalState.modalData) {
    return null;
  }

  return (
    <Modal open={true} onClose={handleModalClose}>
      <Box sx={modalContentsStyle}>
        <>
          {(() => {
            switch (modalState.modalData.modalType) {
              case "IMAGE_UPLOAD_SUCCESS":
                return (
                  <ImageUploadSuccess
                    shareableURL={modalState.modalData.shareableURL}
                  />
                );
              case "IMAGE_UPLOAD_ERROR":
                return (
                  <ImageUploadError
                    errorMessage={modalState.modalData.errorMessage}
                  />
                );
              default:
                return null;
            }
          })()}
          <Button onClick={handleModalClose}>Close</Button>
        </>
      </Box>
    </Modal>
  );
});

export default SystemModal;
