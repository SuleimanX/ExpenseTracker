import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

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

    await user.type(
      screen.getByLabelText("Description"),
      "Lunch",
    );

    await user.type(
      screen.getByLabelText("Amount"),
      "800",
    );

    await user.selectOptions(
      screen.getByLabelText("Type"),
      "expense",
    );

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

  it("shows an error when the description is empty", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText("Amount"),
      "500",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
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
});