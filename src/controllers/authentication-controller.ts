import authenticationService, { SignInParams, SignWithTokenInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function singInPostSyncOAuth(req: Request, res: Response) {
  const { email, password, tokenGitHub } = req.body as SignWithTokenInParams;

  try {
    const result = await authenticationService.signInAndSyncOAuth({ email, password, tokenGitHub });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
