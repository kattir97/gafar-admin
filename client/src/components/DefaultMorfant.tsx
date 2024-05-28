import { ChangeEvent } from "react";
import { useEditorStore } from "../stores/editorStore";
import { CustomAntInput } from "./CustomAntInput";

export const DefaultMorfant: React.FC = () => {
  const { defaultMorfant, setDefaultMorfant } = useEditorStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultMorfant(e.target.value);
  };
  return (
    <div className="w-1/3 p-2">
      <CustomAntInput
        size="large"
        label="Deafult Morfant"
        value={defaultMorfant}
        onChange={handleChange}
      />
    </div>
  );
};
