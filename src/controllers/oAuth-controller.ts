import authenticationService, { OAuthInParams, TokenInParams } from "@/services/oAuth-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postSingIn(req: Request, res: Response) {
  const { tokenGitHub } = req.body as TokenInParams;

  try {
    const user = await authenticationService.postSignIn(tokenGitHub);

    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function getTokenOAuth(req: Request, res: Response) {
  const { code } = req.body as OAuthInParams;

  try {
    const token = await authenticationService.getToken(code);

    return res.status(httpStatus.OK).send(token);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
