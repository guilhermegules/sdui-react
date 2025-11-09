import { Container } from "@mui/material";
import { useServerUI } from "../sdui/api/useServerUI";
import { Renderer } from "../sdui/Renderer";

export const Dashboard = () => {
  const { data: ui, isError } = useServerUI(
    "http://localhost:8080/api/ui/dashboard"
  );

  if (isError) {
    return <p>Error loading the page...</p>;
  }

  return (
    <>
      <Container maxWidth="sm">
        {ui ? <Renderer json={ui} /> : <p>Loading UI...</p>}
      </Container>
    </>
  );
};
