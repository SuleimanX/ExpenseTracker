import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.useRealTimers();
});

describe("Expense Tracker", () => {
  it("displays the initial transaction totals", () => {
    render(<App />);

    expect(screen.getByText("KSh 73,500")).toBeInTheDocument();
    expect(screen.getByText("KSh 80,000")).toBeInTheDocument();
    expect(screen.getByText("KSh 6,500")).toBeInTheDocument();
  });

  it("allows a user to add an expense", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Description"), "Lunch");

    await user.type(screen.getByLabelText("Amount"), "800");

    await user.selectOptions(screen.getByLabelText("Type"), "expense");

    await user.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.getByText("-KSh 800")).toBeInTheDocument();

    expect(
      screen.getByText("Transaction added successfully."),
    ).toBeInTheDocument();
  });

  it("filters transactions by income", async () => {
    const user = userEvent.setup();

    render(<App />);

    const filterGroup = screen.getByRole("group", {
      name: "Transaction filters",
    });

    expect(filterGroup).toBeInTheDocument();

    const incomeButton = screen.getByRole("button", {
      name: "Income",
    });

    await user.click(incomeButton);

    expect(incomeButton).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", {
        name: "All",
      }),
    ).toHaveAttribute("aria-pressed", "false");

    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    expect(screen.queryByText("Transport")).not.toBeInTheDocument();
  });

  it("filters transactions by expenses", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Expenses",
      }),
    );

    expect(screen.queryByText("Salary")).not.toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });

  it("shows a filtered empty state when no transactions match", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Delete Salary transaction",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Income",
      }),
    );

    expect(
      screen.getByText("No transactions match the selected filter."),
    ).toBeInTheDocument();

    expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
    expect(screen.queryByText("Transport")).not.toBeInTheDocument();
  });

  it("shows an error when the description is empty", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("Amount"), "500");

    await user.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a transaction description.",
    );
  });

  it("allows a user to delete a transaction", async () => {
    const user = userEvent.setup();

    render(<App />);

    const deleteGroceriesButton = screen.getByRole("button", {
      name: "Delete Groceries transaction",
    });

    expect(deleteGroceriesButton).toBeInTheDocument();

    await user.click(deleteGroceriesButton);

    expect(
      screen.queryByRole("button", {
        name: "Delete Groceries transaction",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Transaction deleted successfully."),
    ).toBeInTheDocument();
  });
  it("shows an empty state when all transactions are deleted", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Delete Salary transaction",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete Groceries transaction",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete Transport transaction",
      }),
    );

    expect(
      screen.getByText(
        "No transactions yet. Add your first transaction using the form above.",
      ),
    ).toBeInTheDocument();
  });
  it("automatically clears the success message after three seconds", () => {
    vi.useFakeTimers();

    render(<App />);

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Lunch" },
    });

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "500" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Transaction added successfully.",
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
