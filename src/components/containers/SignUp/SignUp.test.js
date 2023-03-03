import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";

describe("SignUp", () => {
    test("sign up form should have an email field", () => {
        render(<SignUp />);
        const emailField = screen.getByPlaceholderText("Enter email address...");

        expect(emailField).toBeInTheDocument();
    })

    test("sign up form should have a password field", () => {
        render(<SignUp />);
        const passwordField = screen.getByPlaceholderText("Enter password...");

        expect(passwordField).toBeInTheDocument();
    })

    test("sign up form should not accept an incomplete email address", () => {
        render(<SignUp />);
        const emailField = screen.getByPlaceholderText("Enter email address...");
        const SignUpSubmitBtn = screen.getByTestId("signup-btn");
        expect(emailField).toHaveAttribute("type", "email");
        
        userEvent.type(emailField, "kautif");
        expect(emailField).toHaveValue("kautif");

        userEvent.click(SignUpSubmitBtn);
        expect(emailField).toBeInvalid();
    })

    test("Sign up form should not submit if password is less than 8 characters", () => {
        render(<SignUp />);
        const emailField = screen.getByPlaceholderText("Enter email address...");
        const passwordField = screen.getByPlaceholderText("Enter password...");
        const SignUpForm = screen.getByTestId("signup-form");
        const SignUpSubmitBtn = screen.getByTestId("signup-btn");

        const handleSubmit = jest.fn();

        userEvent.type(emailField, "kautif@gmail.com");
        expect(emailField).toHaveValue("kautif@gmail.com");

        userEvent.type(passwordField, "t3$ttes");
        userEvent.click(SignUpSubmitBtn);
        expect(handleSubmit).not.toBeCalled();
        
    })
})