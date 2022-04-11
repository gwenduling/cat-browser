import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import CatContext from "../../context/cat-context";
import { DEFAULT_ERROR_MESSAGE } from "../../data/constants";
import { mockBreedsResponse, mockContextValue } from "../../data/mocks";

import CatFilter from "./cat-filter";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockBreedsResponse)
  })
) as any;

describe("Cat Filter", () => {
  it("should render UI", async () => {
    await act(async () => {
      render(<CatFilter/>);
    });
    expect(screen.getByText("Breed:")).toBeInTheDocument();
  });

  it("should update breed in cat context on select change", async () => {
    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}><CatFilter/></CatContext.Provider>);
    });
    const select = screen.getByTestId("filter") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "test2" } });

    expect(mockContextValue.updateBreed).toHaveBeenCalled();
  });

  it("should display default error message on API error", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.reject(new Error())
      }) as any);

    await act(async () => {
      render(<div>
        <ToastContainer/>
        <CatFilter/>
      </div>);
    });

    await waitFor(() => {
      expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
});
