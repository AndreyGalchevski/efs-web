import { Container, styled } from "@mui/material";

import SystemModal from "./components/SystemModal";
import UploadCard from "./components/UploadCard";

const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

function App() {
  return (
    <>
      <CenteredContainer>
        <UploadCard />
      </CenteredContainer>
      <SystemModal />
    </>
  );
}

export default App;
