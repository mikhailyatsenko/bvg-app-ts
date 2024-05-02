import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonWithFavStop } from "./ButtonWithFavStop";

describe("ButtonWithFavStop", () => {
  const stop = { id: "1", name: "Stop 1" };
  const selectStopHandler = jest.fn();

  it("should render the component correctly", () => {
    render(<ButtonWithFavStop stop={stop} selectStopHandler={selectStopHandler} />);

    const buttonElement = screen.getByText(stop.name);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call selectStopHandler with the correct stop when clicked", () => {
    render(<ButtonWithFavStop stop={stop} selectStopHandler={selectStopHandler} />);

    fireEvent.click(screen.getByText(stop.name));

    expect(selectStopHandler).toHaveBeenCalledWith(stop);
  });

  it("should render as favorite if isFav prop is true", () => {
    render(<ButtonWithFavStop stop={stop} selectStopHandler={selectStopHandler} isFav={true} />);

    const buttonElement = screen.getByText(stop.name);
    expect(buttonElement).toHaveClass("favorite");
  });
});
