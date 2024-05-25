import { ChangeEvent } from "react";
import { DefinitionType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";

export const Definitions = () => {
  const { setDefinitions, definitions } = useEditorStore((state) => state);

  // const handleBlur = (e: ChangeEvent<HTMLInputElement>, id: string) => {
  //   const { value } = e.target;
  //   const currDef = defs.find((item) => item.id === id);
  //   if (currDef) {
  //     currDef.value = value.trim();
  //     setDefs([...defs, currDef]);
  //   }
  // };

  const handleAddDef = () => {
    setDefinitions([...definitions, { id: uuidv4(), definition: "" }]);
  };

  const handleChangeDef = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedDef = definitions.find((def) => def.id === id);
    if (updatedDef) {
      updatedDef.definition = event.target.value;

      const newDefs = definitions.map((def) => (def.id === id ? updatedDef : def));
      setDefinitions(newDefs);
    }
  };

  const handleRemoveDef = (index: string): void => {
    if (definitions.length === 1) {
      return;
    }

    const newDefs = definitions.filter((def: DefinitionType) => def.id !== index);
    setDefinitions(newDefs);
  };

  const renderedDefs = definitions.map((def: DefinitionType, index: number) => {
    const num: number = index + 1;
    return (
      <CustomAntInput
        label={`Definition ${num}`}
        buttons
        key={def.id}
        value={def.definition}
        onChange={(e) => handleChangeDef(e, def.id)}
        handleDelete={() => handleRemoveDef(def.id)}
        handleAdd={handleAddDef}
        // onBlur={(e) => handleBlur(e, def.id)}
      />
    );
  });

  return (
    <div className="w-full">
      {renderedDefs && renderedDefs}
      {/* <button
        type="button"
        className="bg-blue-500 text-white rounded py-2 w-full"
        onClick={handleAddDef}
      >
        Add Definition
      </button> */}
    </div>
  );
};
