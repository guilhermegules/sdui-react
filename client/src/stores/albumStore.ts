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
  search: string;
  fetchAlbums: (options: { query: string }) => Promise<void>;
  changeSearch: (search: string) => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  albums: [],
  loading: false,
  error: null,
  search: "",
  fetchAlbums: async ({ query }) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?${query}`,
        {
          cache: "no-cache",
          method: "GET",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch albums");

      const data = await response.json();
      set({ albums: data, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err?.message ?? "", loading: false });
    }
  },
  changeSearch: (search) => set({ search }),
}));
