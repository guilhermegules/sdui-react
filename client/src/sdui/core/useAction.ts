import { useNavigate } from "react-router";
import { useAlbumStore } from "../../stores/albumStore";

export type Action = (action: string | undefined) => void;

/**
 * @returns Returns an action that can interpret backend-driven actions
 */
export const useAction = (): Action => {
  const navigate = useNavigate();
  const { fetchAlbums } = useAlbumStore();

  return async (action: string | undefined) => {
    if (!action) return;

    if (action.startsWith("navigate:")) {
      const path = action.replace("navigate:", "");
      navigate(path);
      return;
    }

    if (action.startsWith("api:")) {
      const [, method, apiAction] = action.split(":");
      await fetchAlbums({ query: "title=quidem molestiae enim" });
      return;
    }
  };
};
