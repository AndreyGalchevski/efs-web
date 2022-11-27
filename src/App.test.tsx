import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import sleep from "./utils/sleep";

describe("App tests", () => {
  let fetchSpy: jest.SpyInstance;
  let writeTextMock: jest.Mock = jest.fn();

  const mockFileURL = "mockFileURL";

  beforeEach(() => {
    fetchSpy = jest.spyOn(window, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 201,
        json: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ data: { fileURL: mockFileURL } });
            }, 1000);
          });
        },
      } as Response);
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the app and it's elements", () => {
    render(<App />);

    const title = screen.getByText("Share Golang Memes");
    expect(title).toBeInTheDocument();

    const fileInput = screen.getByLabelText("Choose file");
    expect(fileInput).toBeInTheDocument();

    const ttlInput = screen.getByLabelText("Expiration time (in seconds)");
    expect(ttlInput).toBeInTheDocument();

    const uploadBtn = screen.getByRole("uploadButton");
    expect(uploadBtn).toBeInTheDocument();
  });

  it("should send the upload request to the API", async () => {
    render(<App />);

    const fileInput = screen.getByLabelText("Choose file");

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    userEvent.upload(fileInput, file);

    const uploadBtn = screen.getByRole("uploadButton");

    userEvent.click(uploadBtn);

    await sleep(1000);

    await screen.findByText("The image is ready to be shared.");

    const copyToClipboardBtn = screen.getByText("Click to copy");
    expect(copyToClipboardBtn).toBeInTheDocument();

    userEvent.click(copyToClipboardBtn);

    expect(fetchSpy).toBeCalledTimes(1);
    expect(writeTextMock).toBeCalledTimes(1);
    expect(writeTextMock).toBeCalledWith(mockFileURL);
  });
});
