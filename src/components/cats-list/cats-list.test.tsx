import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CatContext from "../../context/cat-context";
import { DEFAULT_ERROR_MESSAGE } from "../../data/constants";
import { mockCatsResponse, mockContextValue, mockNavigator } from "../../data/mocks";
import { LoadingStatus } from "../../models/status";

import CatsList from "./cats-list";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCatsResponse)
  })
) as any;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigator
}));

describe("Cats List", () => {
  it("should render cats from response", async () => {
    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    expect(screen.getAllByText("View Details")).toHaveLength(2);
  });

  it("should show loading UI when fetching data", async () => {
    await act(async () => {
      render(<CatContext.Provider value={{ ...mockContextValue, loadingStatus: LoadingStatus.Loading }}>
        <BrowserRouter>
          <ToastContainer/>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
  });

  it("should reset cats if selected breed is empty", async () => {
    let breed = "bsho";
    await act(async () => {
      const { rerender } = render(<CatContext.Provider value={{
        ...mockContextValue, breed
      }}>
        <BrowserRouter>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);

      breed = "";
      rerender(<CatContext.Provider value={{
        ...mockContextValue, breed
      }}>
        <BrowserRouter>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    expect(screen.getByText("No cats available")).toBeInTheDocument();
  });

  it("should navigate when View Details button is clicked", async () => {
    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ToastContainer/>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    act(() => {
      fireEvent.click(screen.getAllByText("View Details")[0]);
    });

    expect(mockNavigator).toHaveBeenCalled();
  });

  it("should display error message when API returns with response not 200", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          status: 400,
          message: "Failed to find cats"
        })
      }) as any);

    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ToastContainer/>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to find cats")).toBeInTheDocument();
    });
  });

  /**
   * The Cat API is intermittent on the response data
   * and the page count data in the headers
   * app should return error to be able to try again
   */
  it("should display error message when response is empty array", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve([])
      }) as any);

    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ToastContainer/>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    await waitFor(() => {
      expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });

  it("should display default error message on API error", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.reject(new Error())
      }) as any);

    await act(async () => {
      render(<CatContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ToastContainer/>
          <CatsList/>
        </BrowserRouter>
      </CatContext.Provider>);
    });

    await waitFor(() => {
      expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
});
