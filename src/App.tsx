import { Container, CssBaseline, styled } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import SystemModal from "./components/SystemModal";
import UploadCard from "./components/UploadCard";
import { ModalProvider } from "./context/ModalContext";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <CenteredContainer>
            <UploadCard />
          </CenteredContainer>
          <SystemModal />
        </ModalProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
