import useSWR from "swr";
import { nodeSchema, type Node } from "../core/schema";
import { getSchema, saveSchema } from "../storage/indexedDb";
import { useEffect, useEffectEvent } from "react";

const uiFetcher = async (url: string): Promise<Node> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch schema");
  }

  const json = await res.json();

  return nodeSchema.parse(json);
};

const uiHandler = async (url: string): Promise<Node> => {
  try {
    const data = await uiFetcher(url);
    await saveSchema(url, data);
    return data;
  } catch (error) {
    console.warn("Error, loading from indexedDB...");
    const cachedUI = await getSchema(url);

    if (cachedUI) {
      return cachedUI as Node;
    }

    throw error;
  }
};

export const useServerUI = (endpoint: string) => {
  const { data, error, mutate, isValidating } = useSWR(endpoint, uiHandler, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 10000,
  });

  const onOnline = useEffectEvent(() => mutate());

  useEffect(() => {
    window.addEventListener("online", onOnline);
    return window.removeEventListener("online", onOnline);
  }, [onOnline]);

  return {
    data,
    error,
    isValidating,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
