interface IntervalArrivalsProps {
  selectValue: string;
  onSelect: (value: string) => void;
  values: string[];
}

export const IntervalDropdown = ({ onSelect, selectValue, values }: IntervalArrivalsProps) => {
  return (
    <select
      value={selectValue}
      onChange={(e) => {
        onSelect(e.target.value);
      }}
    >
      {/* <option value="">All</option> */}
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
