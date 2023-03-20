import { ApplicationError } from "@/protocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

export function invalidGitHubToken(): ApplicationError {
  return {
    name: "InvalidGitHubToken",
    message: "The token is incorrect",
  };
}
