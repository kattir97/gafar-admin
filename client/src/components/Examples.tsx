import { ChangeEvent } from "react";
import { ExampleType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";
import InputControlButtons from "./InputControlButtons";

export const Examples = () => {
  const { setExamples, examples } = useEditorStore((state) => state);

  const handleAddExample = () => {
    setExamples([...examples, { id: uuidv4(), example: "", translation: "" }]);
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedExample = examples.find((example) => example.id === id);
    if (updatedExample) {
      updatedExample.example = event.target.value;

      const newExamples = examples.map((example) => (example.id === id ? updatedExample : example));
      setExamples(newExamples);
    }
  };

  const handleChangeTranslation = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedExample = examples.find((example) => example.id === id);
    if (updatedExample) {
      updatedExample.translation = event.target.value;

      const newExamples = examples.map((example) => (example.id === id ? updatedExample : example));
      setExamples(newExamples);
    }
  };

  const handleRemoveExample = (index: string): void => {
    const newExamples = examples.filter((example: ExampleType) => example.id !== index);
    setExamples(newExamples);
  };

  const renderedExamples = examples.map((example: ExampleType, index: number) => {
    const num: number = index + 1;
    return (
      <div className="flex items-start w-2/3 mb-3 p-2 gap-2 " key={example.id}>
        <div className="w-full">
          <CustomAntInput
            size="large"
            label={`Example ${num}`}
            value={example.example}
            onChange={(e) => handleChangeValue(e, example.id)}
          />

          <CustomAntInput
            label={`Translation ${num}`}
            value={example.translation}
            onChange={(e) => handleChangeTranslation(e, example.id)}
          />
        </div>

        <InputControlButtons
          handleAdd={handleAddExample}
          handleDelete={() => handleRemoveExample(example.id)}
        />
      </div>
    );
  });

  return (
    <div className="border-b border-solid border-gray-400 flex flex-col items-start p-2">
      <h2 className="text-lg mb-2 self-center">Examples</h2>
      {renderedExamples && renderedExamples}
    </div>
  );
};
