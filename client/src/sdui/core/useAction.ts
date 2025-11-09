import { useNavigate } from "react-router";

export type Action = (action: string | undefined) => void;

/**
 * @returns Returns an action that can interpret backend-driven actions
 */
export const useAction = (): Action => {
  const navigate = useNavigate();

  return (action: string | undefined) => {
    if (!action) return;

    if (action.startsWith("navigate:")) {
      const path = action.replace("navigate:", "");
      navigate(path);
      return;
    }
  };
};
