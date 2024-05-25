import { Select, Space } from "antd";
import type { SelectProps } from "antd";

interface ComponentProps {
  options: SelectProps["options"];
  handleMultipleChange?: (value: string[]) => void;
  handleSingleChange?: (value: string) => void;
  mode?: "multiple" | "tags" | undefined;
  value?: string | string[];
  label?: string;
}

export const CustomAntSelect: React.FC<ComponentProps> = ({
  options,
  handleMultipleChange,
  handleSingleChange,
  mode = undefined,
  value,
  label,
}) => {
  const handleChange = (value: string | string[]) => {
    if (mode === "multiple" && handleMultipleChange) {
      handleMultipleChange(value as string[]);
    } else if (handleSingleChange) {
      handleSingleChange(value as string);
    }
  };

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode={mode}
        allowClear
        style={{ width: "100%" }}
        placeholder={`Please select ${label}`}
        onChange={handleChange}
        options={options}
        className="mb-3 w-full"
        value={!value ? undefined : value}
        size="large"
      />
    </Space>
  );
};
