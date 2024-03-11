interface FilterDropdownProps {
  values: string[];
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ values, onSelect }) => {
  return (
    <select
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
  );
};

export default FilterDropdown;
