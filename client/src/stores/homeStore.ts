import { create } from "zustand";
import { WordType, WordsApiResponse } from "../utils/types";
import { AxiosResponse } from "axios";
import { gafarApi } from "../apis/gafarApis";

interface I_HomeStore {
  words: WordType[];
  currentPage: number;
  itemsPerPage: number;
  title: string;
  sortBy: string;
  orderBy: string
}

interface I_HomeStoreActions {
  setWords: (words: WordType[]) => void;
  setCurrentPage: (currPage: number) => void;
  setTitle: (title: string) => void;
  setSortBy: (value: string) => void;
  setOrderBy: (value: string) => void;
  getAllWords: () => Promise<AxiosResponse<WordsApiResponse>>
  searchWords: (title: string) => Promise<AxiosResponse>
  deleteWord: (id: number) => Promise<AxiosResponse<{ status: string; message: string }>>
  getWord: (id: number) => Promise<AxiosResponse>;
}

export const useHomeStore = create<I_HomeStore & I_HomeStoreActions>()((set, get) => ({
  words: [],
  setWords: (words: WordType[]) => set({ words }),
  currentPage: 0,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  itemsPerPage: 10,
  title: '',
  setTitle: (title: string) => set({ title }),
  sortBy: 'created_at',
  orderBy: 'desc',
  setSortBy: (sortBy: string) => set({ sortBy }),
  setOrderBy: (orderBy: string) => set({ orderBy }),

  getAllWords: async (): Promise<AxiosResponse<WordsApiResponse>> => {
    const itemsPerPage = get().itemsPerPage;
    const currentPage = get().currentPage;
    const sortBy = get().sortBy;
    const orderBy = get().orderBy;



    const response = await gafarApi.get(
      `words?limit=${itemsPerPage}&offset=${currentPage * itemsPerPage}&sortBy=${sortBy}&orderBy=${orderBy}`
    );
    console.log('response', response);
    return response;
  },
  searchWords: async (title: string): Promise<AxiosResponse> => {
    console.log(title);
    const response = await gafarApi.get(`words/search-words?query=${title}`);
    console.log('combinedResults', response);
    return response;
  },
  deleteWord: async (
    id: number
  ): Promise<AxiosResponse<{ status: string; message: string }>> => {
    const response = await gafarApi.delete(`word/${id}`);
    const newListOfWords = get().words.filter((word) => word.id !== id);
    get().setWords(newListOfWords);

    return response;
  },
  getWord: async (id: number): Promise<AxiosResponse> => {
    const response = await gafarApi.get(`word/${id}`);
    console.log('response', response);
    return response;
  },
}));

