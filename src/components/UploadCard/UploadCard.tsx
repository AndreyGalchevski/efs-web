import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  styled,
  Typography,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";

import useModal from "../../hooks/useModal";
import useMutationUploadImage from "../../hooks/useMutationUploadImage";

const DEFAULT_TTL_SEC = "60";

const CenteredCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CenteredCardActions = styled(CardActions)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UploadCard = observer(() => {
  const [ttl, setTTL] = useState<string>(DEFAULT_TTL_SEC);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [validationError, setValidationError] = useState<string>();
  const {
    mutate: uploadImage,
    data: uploadImageData,
    error: uploadImageError,
    isLoading: isUploadImageLoading,
  } = useMutationUploadImage();
  const modalState = useModal();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidationError(undefined);

    const { files } = e.target;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleTTLChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTTL(e.target.value);
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      setValidationError("No file chosen");
      return;
    }

    uploadImage({ image: selectedFile, ttl: Number(ttl) });
  };

  const resetForm = () => {
    setSelectedFile(undefined);
    setTTL(DEFAULT_TTL_SEC);
  };

  useEffect(() => {
    if (uploadImageData) {
      resetForm();

      modalState.showModal({
        modalType: "IMAGE_UPLOAD_SUCCESS",
        shareableURL: uploadImageData,
      });
    }
  }, [uploadImageData, modalState]);

  useEffect(() => {
    if (uploadImageError) {
      resetForm();

      modalState.showModal({
        modalType: "IMAGE_UPLOAD_ERROR",
        errorMessage: uploadImageError.message,
      });
    }
  }, [uploadImageError, modalState]);

  return (
    <Card sx={{ minWidth: 300, maxWidth: 375 }} variant="outlined">
      <CardHeader title="Share Golang Memes" sx={{ textAlign: "center" }} />
      <CenteredCardContent>
        <div style={{ marginBottom: 30 }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-input"
            multiple={false}
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button size="small" variant="outlined" component="span">
              Choose file
            </Button>
          </label>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
          {validationError && (
            <Typography color="red">{validationError}</Typography>
          )}
        </div>

        <TextField
          id="ttl-input"
          label="Expiration time (in seconds)"
          type="number"
          onChange={handleTTLChange}
          size="small"
          fullWidth
          value={ttl}
          InputProps={{ inputProps: { min: 1 } }}
        />
      </CenteredCardContent>
      <CenteredCardActions>
        <Button
          variant="contained"
          onClick={handleUploadClick}
          sx={{ width: 90 }}
          role="uploadButton"
        >
          {isUploadImageLoading ? (
            <CircularProgress size={25} sx={{ color: "white" }} />
          ) : (
            "Upload"
          )}
        </Button>
      </CenteredCardActions>
    </Card>
  );
});

export default UploadCard;
