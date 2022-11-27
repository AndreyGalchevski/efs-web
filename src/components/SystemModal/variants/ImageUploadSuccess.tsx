import { Button, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  shareableURL: string;
}

function ImageUploadSuccess({ shareableURL }: Props) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleCopyToClipboardClick = async () => {
    await navigator.clipboard.writeText(shareableURL);
    setCopiedToClipboard(true);
  };

  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 2, textAlign: "center" }}
      >
        The image is ready to be shared.
      </Typography>
      <Button variant="contained" onClick={handleCopyToClipboardClick}>
        {copiedToClipboard ? "Copied" : "Click to copy"}
      </Button>
    </>
  );
}

export default ImageUploadSuccess;
