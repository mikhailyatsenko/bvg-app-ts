import { render, screen, fireEvent } from "@testing-library/react";
import { IntervalDropdown } from "./IntervalDropdown";

describe("IntervalDropdown", () => {
  const selectValue = "5";
  const values = ["1", "5", "10", "15", "30"];

  it("should render the component correctly", () => {
    render(<IntervalDropdown onSelect={jest.fn()} selectValue={selectValue} values={values} />);

    expect(screen.getByText("Arrivals in nearest:")).toBeInTheDocument();
    expect(screen.getByText("minutes")).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(selectValue);

    values.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it("should call onSelect with the selected value", () => {
    const onSelectMock = jest.fn();

    render(<IntervalDropdown onSelect={onSelectMock} selectValue={selectValue} values={values} />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "10" } });

    expect(onSelectMock).toHaveBeenCalledWith("10");
  });
});
