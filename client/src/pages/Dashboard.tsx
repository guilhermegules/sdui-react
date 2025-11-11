import { Container, List, ListItem, Typography } from "@mui/material";
import { useServerUI } from "../sdui/api/useServerUI";
import { Renderer } from "../sdui/Renderer";
import { useAlbumStore } from "../stores/albumStore";

export const Dashboard = () => {
  const { data: ui, isError } = useServerUI(
    "http://localhost:8080/api/ui/dashboard"
  );

  const { albums } = useAlbumStore();

  if (isError) {
    return <p>Error loading the page...</p>;
  }

  return (
    <>
      <Container maxWidth="sm">
        {ui ? <Renderer json={ui} /> : <p>Loading UI...</p>}
        {albums.length > 0 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Albums
            </Typography>

            <List>
              {albums.map((album) => (
                <ListItem key={album.id}>{album.title}</ListItem>
              ))}
            </List>
          </div>
        )}
      </Container>
    </>
  );
};
