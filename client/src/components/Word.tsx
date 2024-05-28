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
    comment,
    setComment,
    setOrigin,
    ergative,
    setErgative,
  } = useEditorStore((state) => state);

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSpeechPartChange = (value: string) => {
    setSpeechPart(value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleOriginChange = (value: string[]) => {
    setOrigin(value);
  };

  const handleErgativeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErgative(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <CustomAntInput label="Word" value={word} onChange={handleWordChange} />
      <CustomAntInput label="Description" value={description} onChange={handleDescriptionChange} />
      <CustomAntSelect
        handleSingleChange={handleSpeechPartChange}
        options={speechPartOptions}
        value={speechPart}
        label="speech part"
      />
      <CustomAntInput label="Ergative" value={ergative} onChange={handleErgativeChange} />
      <CustomAntInput label="Comment" value={comment} onChange={handleCommentChange} />
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
