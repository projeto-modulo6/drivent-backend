import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exchangeCodeForAccessToken, fetchUser } from "@/utils/gitHub-service";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { exclude } from "@/utils/prisma-utils";

async function getToken(code: string) {
  const token = await exchangeCodeForAccessToken(code);
  if (!token) throw httpStatus.UNAUTHORIZED;
  return { tokenGitHub: token };
}

async function getUserOrFail(gitHubId: number): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByGitHubId(gitHubId, { id: true, email: true, password: true });
  if (!user) throw httpStatus.UNAUTHORIZED;

  return user;
}

async function postSignIn(tokenGitHub: string) {
  const gitHubResult = await fetchUser(tokenGitHub);
  if (!gitHubResult) {
    throw httpStatus.UNAUTHORIZED;
  }
  const gitHubId: number = gitHubResult.id;

  const user = await getUserOrFail(gitHubId);

  const token = await createSession(user.id);
  return {
    user: exclude(user, "password"),
    token,
  };
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

export type OAuthInParams = { code: string };

export type TokenInParams = { tokenGitHub: string };

const oAuthService = {
  postSignIn,
  getToken,
};

export default oAuthService;
