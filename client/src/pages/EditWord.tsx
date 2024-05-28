import { FormEvent, useEffect } from "react";
import { Definitions } from "../components/Defintions";
import Word from "../components/Word";
import { Examples } from "../components/Examples";
import { Conjugations } from "../components/Conjugations";
import { Tags } from "../components/Tags";
import { useLoaderData, useNavigate } from "react-router-dom";
import { WordType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../stores/editorStore";

export function EditWord() {
  const data = useLoaderData() as WordType;
  console.log("data", data);

  const navigate = useNavigate();

  const {
    setConjugations,
    setDefinitions,
    setDefaultMorfant,
    setDescription,
    setErgative,
    setExamples,
    setOrigin,
    setSpeechPart,
    setWord,
    setTags,
    updateWord,
    reset,
  } = useEditorStore((state) => state);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleUpdateWord = (wordId: number) => {
    console.log(data.id);
    updateWord(wordId);
    reset();
    navigate("/home");
  };

  const defArr = data.definitions.map((def: string) => ({
    id: uuidv4(),
    definition: def,
  }));
  const examplesArr = data.examples.map((ex: { example: string; translation: string }) => ({
    id: uuidv4(),
    example: ex.example,
    translation: ex.translation,
  }));

  const conArr = data.conjugations.map(
    (con: { morfant: string; conjugation: string; translation: string }) => ({
      id: uuidv4(),
      morfant: con.morfant,
      conjugation: con.conjugation,
      translation: con.translation,
    })
  );

  useEffect(() => {
    setOrigin(data.origin ? data.origin.split(",") : []);
    setDefinitions(data.definitions.length > 0 ? defArr : [{ id: uuidv4(), definition: "" }]);
    setExamples(
      data.examples.length > 0 ? examplesArr : [{ id: uuidv4(), example: "", translation: "" }]
    );
    setConjugations(
      data.conjugations.length > 0
        ? conArr
        : [{ id: uuidv4(), morfant: "", conjugation: "", translation: "" }]
    );

    setWord(data.word);
    setDescription(data.description);

    setErgative(data.ergative);
    setSpeechPart(data.speechPart);
    setDefaultMorfant(data.defaultMorfant);

    setTags(data.tags);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-lg font-semibold mb-5">Edit Word</h1>

      <form className="w-full flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 border-b border-solid border-gray-400 p-5">
          <Word />
          <Definitions />
        </div>
        <Examples />
        <Conjugations />
        <Tags />
        <button
          type="button"
          className="bg-blue-500 text-white rounded py-2 w-full"
          onClick={() => handleUpdateWord(data.id)}
        >
          Update Word
        </button>
      </form>
    </div>
  );
}
