import { Input as AntInput, InputProps as AntInputProps, Button } from "antd";
import { IoCloseSharp, IoAddSharp } from "react-icons/io5";

interface InputProps extends AntInputProps {
  label: string;
  buttons?: boolean;
  handleDelete?: () => void;
  handleAdd?: () => void;
}

export const CustomAntInput: React.FC<InputProps> = ({
  label,
  buttons = false,
  handleDelete,
  handleAdd,
  ...rest
}) => {
  return (
    <div className="flex items-center mb-3 w-full gap-2">
      <AntInput {...rest} placeholder={label} className="w-full" size="large" />
      {buttons && (
        <div className="flex gap-2">
          <Button shape="circle" icon={<IoCloseSharp />} danger onClick={handleDelete} />
          <Button shape="circle" icon={<IoAddSharp />} onClick={handleAdd} />
        </div>
      )}
    </div>
  );
};
