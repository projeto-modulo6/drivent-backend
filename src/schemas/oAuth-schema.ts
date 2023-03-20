import { OAuthInParams, TokenInParams } from "@/services";
import Joi from "joi";

export const oAuth = Joi.object<OAuthInParams>({
  code: Joi.string().required(),
});

export const token = Joi.object<TokenInParams>({
  tokenGitHub: Joi.string().required(),
});
