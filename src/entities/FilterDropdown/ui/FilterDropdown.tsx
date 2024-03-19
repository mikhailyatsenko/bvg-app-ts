interface FilterDropdownProps {
  values: string[];
  selectValue: string;
  onSelect: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ values, selectValue, onSelect }) => {
  return (
    <label>
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
    </label>
  );
};
