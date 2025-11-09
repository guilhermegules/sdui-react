import { Container, CssBaseline } from "@mui/material";
import { Renderer } from "./sdui/Renderer";
import { useServerUI } from "./sdui/api/useServerUI";

function App() {
  const { data: ui, isError } = useServerUI(
    "http://localhost:8080/api/ui/home"
  );

  if (isError) {
    return <p>Error loading the page...</p>;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        {ui ? <Renderer json={ui} /> : <p>Loading UI...</p>}
      </Container>
    </>
  );
}

export default App;
