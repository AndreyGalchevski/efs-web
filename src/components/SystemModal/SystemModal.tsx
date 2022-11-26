import { Modal, Box, SxProps, Button } from "@mui/material";

import { useModalActions } from "../../hooks/useModalActions";
import { useModalState } from "../../hooks/useModalState";
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

function SystemModal() {
  const { isVisible, modalData } = useModalState();
  const { hideModal } = useModalActions();

  const handleModalClose = () => {
    hideModal();
  };

  if (!isVisible || !modalData) {
    return null;
  }

  return (
    <Modal open={true} onClose={handleModalClose}>
      <Box sx={modalContentsStyle}>
        <>
          {(() => {
            switch (modalData.modalType) {
              case "IMAGE_UPLOAD_SUCCESS":
                return (
                  <ImageUploadSuccess shareableURL={modalData.shareableURL} />
                );
              case "IMAGE_UPLOAD_ERROR":
                return (
                  <ImageUploadError errorMessage={modalData.errorMessage} />
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
}

export default SystemModal;
