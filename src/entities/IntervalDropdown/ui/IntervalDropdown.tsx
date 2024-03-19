import cls from "./IntervalDropdown.module.scss";

interface IntervalArrivalsProps {
  selectValue: string;
  onSelect: (value: string) => void;
  values: string[];
}

export const IntervalDropdown = ({ onSelect, selectValue, values }: IntervalArrivalsProps) => {
  return (
    <div className={cls.IntervalDropdown}>
      <div>Arrivals in nearest:</div>
      <label className={cls.intervalLabel}>
        <select
          value={selectValue}
          onChange={(e) => {
            onSelect(e.target.value);
          }}
        >
          {values.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <div>minutes</div>
    </div>
  );
};
