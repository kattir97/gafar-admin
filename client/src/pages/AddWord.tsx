import { FormEvent } from "react";
import { Definitions } from "../components/Defintions";
import Word from "../components/Word";
import { Examples } from "../components/Examples";
import { Conjugations } from "../components/Conjugations";
import { Tags } from "../components/Tags";
import { useNavigate } from "react-router-dom";
import { initialState, useEditorStore } from "../stores/editorStore";
import { Button } from "antd";

export function AddWord() {
  const { reset, addWord } = useEditorStore((state) => state);
  const navigate = useNavigate();

  console.log("initialState", initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddWord();
    reset();
  };

  const handleAddWord = async () => {
    await addWord();
    reset();
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-lg font-semibold mb-5">Add Word</h1>

      <form className="w-full flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 border-b border-solid border-gray-400 p-5">
          <Word />
          <Definitions />
        </div>
        <Examples />
        {/* <DefaultMorfant /> */}
        <Conjugations />
        <Tags />
        <Button type="primary" size="large" className="bg-blue-500" onClick={() => handleAddWord()}>
          Add Word
        </Button>
      </form>
    </div>
  );
}
