import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserContextProvider } from "../../../UserContext";
import SignUp from "./SignUp";

describe("SignUp", () => {
    test("sign up form should have an email field", () => {
        render(
            <UserContextProvider>
                <SignUp />
            </UserContextProvider>
        );
        const emailField = screen.getByPlaceholderText("Enter email address...");

        expect(emailField).toBeInTheDocument();
    })

    test("sign up form should have a password field", () => {
        render(
            <UserContextProvider>
                <SignUp />
            </UserContextProvider>
        );
        const passwordField = screen.getByPlaceholderText("Enter password...");

        expect(passwordField).toBeInTheDocument();
    })

    test("sign up form should not accept an incomplete email address", () => {
        render(
            <UserContextProvider>
                <SignUp />
            </UserContextProvider>
        );
        const emailField = screen.getByPlaceholderText("Enter email address...");
        const SignUpSubmitBtn = screen.getByTestId("signup-btn");
        expect(emailField).toHaveAttribute("type", "email");
        
        userEvent.type(emailField, "kautif");
        expect(emailField).toHaveValue("kautif");

        userEvent.click(SignUpSubmitBtn);
        expect(emailField).toBeInvalid();
    })

    test("Sign up form should not submit if password is less than 8 characters", () => {
        const handleSubmit = jest.fn();
        render(<SignUp handleSubmit={handleSubmit} />);
        const emailField = screen.getByPlaceholderText("Enter email address...");
        const passwordField = screen.getByPlaceholderText("Enter password...");
        const SignUpForm = screen.getByTestId("signup-form");
        const SignUpSubmitBtn = screen.getByTestId("signup-btn");

        userEvent.type(emailField, "kautif@gmail.com");
        expect(emailField).toHaveValue("kautif@gmail.com");

        userEvent.type(passwordField, "t3$ttes");
        userEvent.click(SignUpSubmitBtn);
        expect(handleSubmit).not.toBeCalled();
        
    })

    test("Sign up form should not submit if password doesn't contain numbers or symbols", () => {
        const handleSubmit = jest.fn();
        render(<SignUp handleSubmit={handleSubmit} />);
        const emailField = screen.getByPlaceholderText("Enter email address...");
        const passwordField = screen.getByPlaceholderText("Enter password...");
        const SignUpSubmitBtn = screen.getByTestId("signup-btn");

        userEvent.type(emailField, "kautif@gmail.com");
        expect(emailField).toHaveValue("kautif@gmail.com");

        userEvent.type(passwordField, "testtest");
        userEvent.click(SignUpSubmitBtn);
        expect(handleSubmit).not.toBeCalled();
        
    })
})