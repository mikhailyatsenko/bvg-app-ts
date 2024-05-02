import { render, screen, fireEvent } from "@testing-library/react";
import { FilterDropdown } from "./FilterDropdown";

describe("FilterDropdown", () => {
  const filterTitle = "Filter Title";
  const selectValue = "selectedValue";
  const values = ["Value 1", "Value 2", "Value 3"];

  it("should render the component correctly", () => {
    render(<FilterDropdown filterTitle={filterTitle} values={values} selectValue={selectValue} onSelect={jest.fn()} />);

    expect(screen.getByText(filterTitle)).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    expect(screen.getByText("All")).toBeInTheDocument();
    values.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("should call onSelect with the selected value", () => {
    const onSelectMock = jest.fn();
    render(
      <FilterDropdown filterTitle={filterTitle} values={values} selectValue={selectValue} onSelect={onSelectMock} />
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Value 2" } });

    expect(onSelectMock).toHaveBeenCalledWith("Value 2");
  });
});
