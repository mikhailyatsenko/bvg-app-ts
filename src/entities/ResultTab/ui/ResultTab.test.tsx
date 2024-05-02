import { render, screen, fireEvent } from "@testing-library/react";
import { ResultTab } from "./ResultTab";

describe("ResultTab", () => {
  const stopsArray = [
    { id: "1", name: "Stop 1" },
    { id: "2", name: "Stop 2" },
    { id: "3", name: "Stop 3" },
  ];

  it("should render the component correctly", () => {
    render(<ResultTab stopsArray={stopsArray} isActive={true} onSelect={jest.fn()} />);

    expect(screen.getByTestId("result-tab")).toBeInTheDocument();

    stopsArray.forEach((stop) => {
      expect(screen.getByText(stop.name)).toBeInTheDocument();
    });
  });

  it("should call onSelect when a stop is clicked", () => {
    const onSelectMock = jest.fn();
    render(<ResultTab stopsArray={stopsArray} isActive={true} onSelect={onSelectMock} />);

    fireEvent.click(screen.getByText(stopsArray[0].name));

    expect(onSelectMock).toHaveBeenCalledWith(stopsArray[0]);
  });
});
