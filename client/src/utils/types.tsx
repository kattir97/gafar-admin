export type ChildrenProps = {
  children: React.ReactNode;
};

export type DefinitionType = {
  id: string;
  definition: string;
};

export type ExampleType = {
  id: string;
  example: string;
  translation: string;
};

export type ConjugationType = {
  id: string;
  morfant: string;
  conjugation: string;
  translation: string;
};

export type WordType = {
  id: number;
  word: string;
  description: string;
  speechPart: string;
  ergative: string;
  comment: string;
  origin: string;
  defaultMorfant: string;
  audio: string;
  createdAt: string;
  definitions: string[];
  examples: {
    example: string;
    translation: string;
  }[];
  conjugations: {
    morfant: string;
    conjugation: string;
    translation: string;
  }[];
  tags: string[];
};

export type WordsApiResponse = {
  count: number;
  words: WordType[];
};

export type ApiResponse = {
  data: WordType;
};
