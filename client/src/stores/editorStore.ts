import { create } from "zustand";
import { ConjugationType, DefinitionType, ExampleType } from "../utils/types";
import { AxiosResponse } from "axios";
import { v4 as uuidv4 } from 'uuid';
import { gafarApi } from "../apis/gafarApis";

interface I_EditorStore {
  word: string;
  description: string;
  speechPart: string;
  origin: string[];
  ergative: string;
  tags: string[];
  defaultMorfant: string;
  definitions: DefinitionType[];
  examples: ExampleType[];
  conjugations: ConjugationType[];
}

interface I_EditorStoreActions {
  addWord: () => Promise<void>,
  updateWord: (id: number) => Promise<AxiosResponse<{ status: string; message: string }>>,
  setWord: (word: string) => void;
  setDescription: (description: string) => void;
  setSpeechPart: (speechPart: string) => void;
  setOrigin: (origin: string[]) => void;
  setErgative: (ergative: string) => void;
  setTags: (tags: string[]) => void;
  setDefaultMorfant: (defaultMorfant: string) => void;
  setDefinitions: (defs: DefinitionType[]) => void;
  setExamples: (examples: ExampleType[]) => void;
  setConjugations: (conjugations: ConjugationType[]) => void;
  reset: () => void,
}


const getWordData = () => {
  const state = useEditorStore.getState();
  return {
    word: state.word,
    description: state.description,
    speechPart: state.speechPart,
    origin: state.origin.join(','),
    ergative: state.ergative,
    tags: state.tags,
    defaultMorfant: state.defaultMorfant,
    definitions: state.definitions,
    examples: state.examples,
    conjugations: state.conjugations,
  };
};



// define the initial state
export const initialState: I_EditorStore = {
  word: "",
  description: "",
  speechPart: "",
  origin: [],
  ergative: "",
  tags: [],
  defaultMorfant: "",
  definitions: [{ id: uuidv4(), definition: "" }],
  examples: [{ id: uuidv4(), example: "", translation: "" }],
  conjugations: [{ id: uuidv4(), morfant: "", conjugation: "", translation: "" }],
}


export const useEditorStore = create<I_EditorStore & I_EditorStoreActions>()((set) => ({
  ...initialState,
  setWord: (word) => set({ word }),
  setDescription: (description) => set({ description }),
  setSpeechPart: (speechPart) => set({ speechPart }),
  setOrigin: (origin) => set({ origin }),
  setErgative: (ergative) => set({ ergative }),
  setTags: (tags) => set({ tags }),
  setDefaultMorfant: (defaultMorfant) => set({ defaultMorfant }),
  setDefinitions: (definitions) => set({ definitions }),
  setExamples: (examples) => set({ examples }),
  setConjugations: (conjugations) => set({ conjugations }),



  addWord: async (): Promise<void> => {
    try {
      const response = await gafarApi.post("word", getWordData());
      console.log('addwordresponse:', response);
    } catch (error) {
      console.log(error);
    }
  },

  updateWord: async (
    id: number
  ): Promise<AxiosResponse<{ status: string; message: string }>> => {
    const response = await gafarApi.put(`word/${id}`, getWordData());
    return response;
  },

  reset: () => set(() => ({
    word: "",
    description: "",
    speechPart: "",
    origin: [],
    ergative: "",
    tags: [],
    defaultMorfant: "",
    definitions: [{ id: uuidv4(), definition: "" }],
    examples: [{ id: uuidv4(), example: "", translation: "" }],
    conjugations: [{ id: uuidv4(), morfant: "", conjugation: "", translation: "" }],

  })),
}));

