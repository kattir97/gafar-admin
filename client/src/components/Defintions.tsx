import { ChangeEvent } from "react";
import { DefinitionType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";

export const Definitions = () => {
  const { setDefinitions, definitions } = useEditorStore((state) => state);

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
      />
    );
  });

  return <div className="w-full">{renderedDefs && renderedDefs}</div>;
};
