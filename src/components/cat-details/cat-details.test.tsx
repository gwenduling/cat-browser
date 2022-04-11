import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "../../data/constants";
import { mockCatResponse, mockNavigator } from "../../data/mocks";

import CatDetails from "./cat-details";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCatResponse)
  })
) as any;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigator
}));

describe("Cat Details", () => {
  it("should render cat data", async () => {
    await act(async () => {
      render(<BrowserRouter><CatDetails id="test"/></BrowserRouter>);
    });
    expect(screen.getByText("Abyssinian")).toBeInTheDocument();
    expect(screen.getByText("Egypt")).toBeInTheDocument();
    expect(screen.getByText("Active, Energetic, Independent, Intelligent, Gentle")).toBeInTheDocument();
    expect(screen.getByText("lorem ipsum dolor ismet")).toBeInTheDocument();
  });

  it("should navigate when Go Back button is clicked", async () => {
    await act(async () => {
      render(<BrowserRouter><CatDetails id="test"/></BrowserRouter>);
    });

    act(() => {
      fireEvent.click(screen.getByText("Go Back"));
    });

    expect(mockNavigator).toHaveBeenCalled();
  });

  it("should display error message when API returns with response not 200", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          status: 400,
          message: "Failed to find cat with ID"
        })
      }) as any);

    await act(async () => {
      render(<BrowserRouter>
        <ToastContainer/>
        <CatDetails id="test"/>
      </BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to find cat with ID")).toBeInTheDocument();
    });
  });

  it("should display default error message on API error", async () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.reject(new Error())
      }) as any);

    await act(async () => {
      render(<BrowserRouter>
        <ToastContainer/>
        <CatDetails id="test"/>
      </BrowserRouter>);
    });

    await waitFor(() => {
      expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
});
