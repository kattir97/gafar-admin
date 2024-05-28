import { ChangeEvent, useState } from "react";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";
export function Tags() {
  const { tags, setTags } = useEditorStore((state) => state);
  const [inputValue, setInputValue] = useState("");

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    setTags([...tags, inputValue]);
    setInputValue("");
  };

  const handleDeleteTag = (idx: number) => {
    const newTags = tags.filter((_, currentIndex) => currentIndex !== idx);
    setTags(newTags);
  };

  const renderedTags = tags.map((tag: string, idx: number) => {
    return (
      <span
        className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
        key={idx}
      >
        {tag}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => handleDeleteTag(idx)}
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  });

  return (
    <>
      <h2 className="text-lg mb-2 self-center">Tags</h2>
      <div className=" flex flex-col w-1/3  items-center p-2">
        <CustomAntInput
          label="Add a tag..."
          value={inputValue}
          onChange={(e) => handleChangeTag(e)}
          onKeyDown={(e) => handleAddTag(e)}
        />

        <div className="my-3 flex flex-wrap -m-1">{renderedTags}</div>
      </div>
    </>
  );
}
