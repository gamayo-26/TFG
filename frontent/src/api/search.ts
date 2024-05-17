import { create } from "zustand";

interface SearchProducts {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const useSearch = create<SearchProducts>((set) => ({
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term}),
}));