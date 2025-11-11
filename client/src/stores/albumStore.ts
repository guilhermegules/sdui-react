import { create } from "zustand";

export interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumStore {
  albums: Album[];
  loading: boolean;
  error: string | null;
  fetchAlbums: (options: { query: string }) => Promise<void>;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  loading: false,
  error: null,
  fetchAlbums: async ({ query }) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch albums");

      const data = await response.json();
      set({ albums: data, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err?.message ?? "", loading: false });
    }
  },
}));
