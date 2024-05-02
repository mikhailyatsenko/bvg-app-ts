import { render, fireEvent, screen } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput component", () => {
  it("should render input field with placeholder and label", () => {
    const onChangeInput = jest.fn();
    const searchValue = "";

    const { getByPlaceholderText, getByLabelText } = render(
      <SearchInput onChangeInput={onChangeInput} searchValue={searchValue} />
    );

    const inputElement = getByPlaceholderText("Name");
    expect(inputElement).toBeInTheDocument();

    const labelElement = getByLabelText("Type here to search station");
    expect(labelElement).toBeInTheDocument();
  });

  it("should call onChangeInput callback when input value changes", () => {
    const onChangeInput = jest.fn();
    const searchValue = "";
    render(<SearchInput onChangeInput={onChangeInput} searchValue={searchValue} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "Test station" } });
    fireEvent.change(inputElement, { target: { value: "Test station 2" } });

    expect(onChangeInput).toHaveBeenCalledTimes(2);
    expect(onChangeInput).toHaveBeenCalledWith(expect.any(Object));
  });
});
