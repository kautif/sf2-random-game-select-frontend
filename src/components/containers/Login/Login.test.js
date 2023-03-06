import { render, screen } from "@testing-library/react"
import { UserContextProvider } from "../../../UserContext"
import Login from "./Login"

describe("Login form", () => {
    test("Login form should have an email field", () => {
        render(
            <UserContextProvider>
                <Login />
            </UserContextProvider>
        )
        const emailField = screen.getByPlaceholderText("Enter email address...");
        expect(emailField).toBeInTheDocument();

    })

    test("Login form should have a password field", () => {
        render(
            <UserContextProvider>
                <Login />
            </UserContextProvider>
        )
        const passwordField = screen.getByPlaceholderText("Enter password...");
        expect(passwordField).toBeInTheDocument();
    })
})