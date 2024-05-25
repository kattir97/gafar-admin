import { ChangeEvent } from "react";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";
import { CustomAntSelect } from "./CustomAntSelect";
import { originOptions, speechPartOptions } from "../utils/options";

function Word() {
  const {
    word,
    setWord,
    description,
    setDescription,
    speechPart,
    setSpeechPart,
    origin,
    setOrigin,
    ergative,
    setErgative,
  } = useEditorStore((state) => state);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>, stateSetter: ([key]: string) => void) => {
    const { value } = e.target;
    stateSetter(value.trim());
  };

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSpeechPartChange = (value: string) => {
    setSpeechPart(value);
  };

  const handleOriginChange = (value: string[]) => {
    setOrigin(value);
  };

  const handleErgativeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErgative(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <CustomAntInput
        label="Word"
        value={word}
        onChange={handleWordChange}
        onBlur={(e) => handleBlur(e, setWord)}
      />
      <CustomAntInput
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        onBlur={(e) => handleBlur(e, setDescription)}
      />
      <CustomAntSelect
        handleSingleChange={handleSpeechPartChange}
        options={speechPartOptions}
        value={speechPart}
        label="speech part"
      />
      <CustomAntInput
        label="Ergative"
        value={ergative}
        onChange={handleErgativeChange}
        onBlur={(e) => handleBlur(e, setErgative)}
      />
      <CustomAntSelect
        options={originOptions}
        handleMultipleChange={handleOriginChange}
        mode="multiple"
        value={origin}
        label="origin"
      />
    </div>
  );
}

export default Word;
