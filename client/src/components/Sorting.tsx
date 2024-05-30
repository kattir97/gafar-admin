import { Select } from "antd";
import { useHomeStore } from "../stores/homeStore";

export const Sorting: React.FC = () => {
  const { setSortBy, setOrderBy } = useHomeStore((state) => state);

  const sortByOptions = [
    {
      value: "word",
      label: "word",
    },
    {
      value: "created_at",
      label: "created at",
    },
  ];

  const orderByOptions = [
    {
      value: "asc",
      label: "ascending",
    },
    {
      value: "desc",
      label: "descending",
    },
  ];

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value);
  };

  return (
    <div className="flex items-center justify-between my-3">
      <Select
        options={sortByOptions}
        defaultValue="created_at"
        style={{ width: 120 }}
        onChange={handleSortByChange}
      />
      <Select
        options={orderByOptions}
        defaultValue="descending"
        style={{ width: 120 }}
        onChange={handleOrderByChange}
      />
    </div>
  );
};
