import { useMutation } from "react-query";

import { UPLOAD_FIELD_NAME } from "../utils/constants";

export interface UploadImageMutationParams {
  image: File;
  ttl?: number;
}

const uploadImage = async ({
  image,
  ttl,
}: UploadImageMutationParams): Promise<string> => {
  const headers: HeadersInit = {};

  if (ttl) {
    headers["x-ttl"] = ttl.toString();
  }

  const formData = new FormData();
  formData.append(UPLOAD_FIELD_NAME, image);

  const config: RequestInit = {
    method: "PUT",
    headers,
    body: formData,
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/file`,
    config
  );

  const parsedResponse = await response.json();

  if (response.ok) {
    return parsedResponse.data.fileURL;
  } else {
    return Promise.reject(
      parsedResponse.error || "Oops! Something went wrong.."
    );
  }
};

const useMutationUploadImage = () => {
  return useMutation<string, Error, UploadImageMutationParams>(uploadImage);
};

export default useMutationUploadImage;
