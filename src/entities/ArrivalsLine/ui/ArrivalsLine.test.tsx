import { render } from "@testing-library/react";
import { ArrivalsLine } from "./ArrivalsLine";

describe("ArrivalsLine component", () => {
  const props = {
    transportType: "Bus",
    routeNumber: "123",
    destination: "Main Street",
    time: "2024-04-30T12:30:00",
    remainingTime: 5,
  };

  test("renders correctly with provided props", () => {
    const { getByText, getAllByText } = render(<ArrivalsLine {...props} />);

    expect(getByText("Bus")).toBeInTheDocument();
    expect(getAllByText("123")).toHaveLength(2);
    expect(getByText("Main Street")).toBeInTheDocument();
    expect(getByText("12:30")).toBeInTheDocument();
    expect(getByText("~ 5 min")).toBeInTheDocument();
  });

  test("formats remaining time correctly", () => {
    const { getByText, rerender } = render(<ArrivalsLine {...props} remainingTime={-3} />);
    expect(getByText("gone")).toBeInTheDocument();

    rerender(<ArrivalsLine {...props} remainingTime={0} />);
    expect(getByText("now")).toBeInTheDocument();

    rerender(<ArrivalsLine {...props} remainingTime={10} />);
    expect(getByText("~ 10 min")).toBeInTheDocument();
  });
});
