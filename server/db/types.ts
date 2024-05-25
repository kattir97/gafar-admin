import { Static } from "@sinclair/typebox";
import { WordBody } from "../src/schemas/word/body.js";

interface WordItem {
  id: number;
  word_id: number;
}


export interface I_Word {
  id: number;
  word: string;
  speech_part: string;
  ergative: string;
  default_morfant: string;
  origin: string;
  audio: string;
  description: string;
  created_at: Date;
}

export interface I_Conjugation extends WordItem {
  conjugation: string;
  translation: string;
  morfant: string;
}

export interface I_Example extends WordItem {
  example: string;
  translation: string;
}

export interface I_Definition extends WordItem {
  definition: string;
}

export interface I_Tag extends WordItem {
  tag_id: number;
  tag: string;
}

export type WordBodyType = Static<typeof WordBody>;