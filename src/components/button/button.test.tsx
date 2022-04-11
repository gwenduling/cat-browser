import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./button";

describe("Button", () => {
  it("should render button", () => {
    render(<Button content="Click me" onClick={() => {}}/>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should render button with -block variant CSS class", () => {
    const { container } = render(<Button content="Click me" onClick={() => {}} block={true}/>);
    expect(container.firstChild).toHaveClass("-block");
  });

  it("should render button with -disabled variant CSS class", () => {
    const { container } = render(<Button content="Click me" onClick={() => {}} disabled={true}/>);
    expect(container.firstChild).toHaveClass("-disabled");
  });

  it("should render button with -success variant CSS class", () => {
    const { container } = render(<Button content="Click me" onClick={() => {}} success={true}/>);
    expect(container.firstChild).toHaveClass("-success");
  });

  it("should call callback on button click", () => {
    const mockCallback = jest.fn(() => {});

    render(<Button content="Click me" onClick={mockCallback}/>);
    fireEvent.click(screen.getByText("Click me"));
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
