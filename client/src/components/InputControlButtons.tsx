import { Button } from "antd";
import { IoAddSharp, IoCloseSharp } from "react-icons/io5";

interface InputProps {
  handleDelete?: () => void;
  handleAdd?: () => void;
}

const InputControlButtons: React.FC<InputProps> = ({ handleDelete, handleAdd }) => {
  return (
    <div className="flex gap-2">
      <Button shape="circle" icon={<IoCloseSharp />} danger onClick={handleDelete} />
      <Button shape="circle" icon={<IoAddSharp />} onClick={handleAdd} />
    </div>
  );
};

export default InputControlButtons;
