import { ChangeEvent } from "react";
import { ConjugationType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";
import { DefaultMorfant } from "./DefaultMorfant";
import InputControlButtons from "./InputControlButtons";

export const Conjugations = () => {
  const { conjugations, setConjugations } = useEditorStore((state) => state);

  const handleAddConjugation = () => {
    setConjugations([
      ...conjugations,
      { id: uuidv4(), morfant: "", conjugation: "", translation: "" },
    ]);
  };

  const handleInputBlur = (id: string, field: string) => {
    const newList = conjugations.map((item: ConjugationType & { [key: string]: string }) =>
      item.id === id ? { ...item, [field]: item[field].trim() } : item
    );
    setConjugations(newList);
  };

  const handleChangeTranslation = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedConjugation = conjugations.find((conjug) => conjug.id === id);
    if (updatedConjugation) {
      updatedConjugation.translation = event.target.value;

      const newConjugations = conjugations.map((conjug) =>
        conjug.id === id ? updatedConjugation : conjug
      );
      setConjugations(newConjugations);
    }
  };

  const handleChangeConjugation = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedConjugation = conjugations.find((conjug) => conjug.id === id);
    if (updatedConjugation) {
      updatedConjugation.conjugation = event.target.value;

      const newConjugations = conjugations.map((conjug) =>
        conjug.id === id ? updatedConjugation : conjug
      );
      setConjugations(newConjugations);
    }
  };

  const handleChangeMorfant = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedConjugation = conjugations.find((conjug) => conjug.id === id);
    if (updatedConjugation) {
      updatedConjugation.morfant = event.target.value;

      const newConjugations = conjugations.map((conjug) =>
        conjug.id === id ? updatedConjugation : conjug
      );
      setConjugations(newConjugations);
    }
  };

  const handleRemoveConjugation = (index: string): void => {
    const newConjugations = conjugations.filter((conjug: ConjugationType) => conjug.id !== index);
    setConjugations(newConjugations);
  };

  const renderedConjugations = conjugations.map((conjug: ConjugationType, index: number) => {
    const num: number = index + 1;
    return (
      <div className="flex items-start w-2/3  mb-3  p-2 gap-2 " key={conjug.id}>
        <div className="w-full">
          <CustomAntInput
            label={`Morfant ${num}`}
            value={conjug.morfant}
            onChange={(e) => handleChangeMorfant(e, conjug.id)}
            onBlur={() => handleInputBlur(conjug.id, "morfant")}
          />

          <CustomAntInput
            label={`Conjugation ${num}`}
            value={conjug.conjugation}
            onChange={(e) => handleChangeConjugation(e, conjug.id)}
            onBlur={() => handleInputBlur(conjug.id, "conjugation")}
          />

          <CustomAntInput
            label={`Translation ${num}`}
            value={conjug.translation}
            onChange={(e) => handleChangeTranslation(e, conjug.id)}
            onBlur={() => handleInputBlur(conjug.id, "translation")}
          />
        </div>
        <InputControlButtons
          handleAdd={handleAddConjugation}
          handleDelete={() => handleRemoveConjugation(conjug.id)}
        />
      </div>
    );
  });

  return (
    <div className="border-b border-solid border-gray-400 flex flex-col items-start p-2">
      <h2 className="text-lg mb-2 self-center">Conjugations</h2>
      <DefaultMorfant />
      {renderedConjugations}
    </div>
  );
};
