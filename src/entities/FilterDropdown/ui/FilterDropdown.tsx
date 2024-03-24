import cls from "./FilterDropdown.module.scss";

interface FilterDropdownProps {
  filterTitle: string;
  values: string[];
  selectValue: string;
  onSelect: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ values, selectValue, onSelect, filterTitle }) => {
  return (
    <div className={cls.FilterDropdown}>
      <p>{filterTitle}</p>
      <div className={cls.selectWrapper}>
        <select
          value={selectValue}
          onChange={(e) => {
            onSelect(e.target.value);
          }}
        >
          <option value="">All</option>
          {values.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
