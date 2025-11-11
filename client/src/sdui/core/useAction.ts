import { useNavigate } from "react-router";
import { useCallback } from "react";

export type Action = (action: string | undefined) => void;

export type ActionHandler<T = any> = (params?: T) => Promise<void> | void;

interface UseActionProps {
  handlers?: Record<string, ActionHandler>;
}

/**
 * @returns Returns an action that can interpret backend-driven actions
 */
export const useAction = ({ handlers }: UseActionProps): Action => {
  const navigate = useNavigate();

  return useCallback(
    async (action: string | undefined) => {
      if (!action) return;

      if (action.startsWith("navigate:")) {
        const path = action.replace("navigate:", "");
        navigate(path);
        return;
      }

      const [type, value] = action.split(":");
      const handler = handlers?.[type];
      console.log(type, value);
      if (typeof handler === "function") {
        await handler({ value });
        return;
      }
    },
    [handlers, navigate]
  );
};
