import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { fetchUser } from "@/utils/gitHub-service";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { invalidCredentialsError, invalidGitHubToken } from "./errors";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function signInAndSyncOAuth(params: SignWithTokenInParams) {
  const { email, password, tokenGitHub } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const gitHubId = await getGitHubIdOrFail(tokenGitHub);

  await findUserByGitHubIdAndFail(gitHubId);

  await userRepository.updateGitHubId(user.id, gitHubId);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function findUserByGitHubIdAndFail(gitHubId: number) {
  const user = await userRepository.findByGitHubId(gitHubId);
  if (user) throw invalidCredentialsError();
}

async function getGitHubIdOrFail(tokenGitHub: string) {
  const gitHubData = await fetchUser(tokenGitHub);
  if (!gitHubData) {
    throw invalidGitHubToken();
  }

  return gitHubData.id;
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignWithTokenInParams = SignInParams & { tokenGitHub: string };

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  signInAndSyncOAuth,
};

export default authenticationService;
export * from "./errors";
