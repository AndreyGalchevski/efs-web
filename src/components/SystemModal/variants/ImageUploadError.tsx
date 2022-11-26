import { Typography } from "@mui/material";

interface Props {
  errorMessage: string;
}

function ImageUploadError({ errorMessage }: Props) {
  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Oops... Something went wrong
      </Typography>
      <Typography>{errorMessage}</Typography>
    </>
  );
}

export default ImageUploadError;
