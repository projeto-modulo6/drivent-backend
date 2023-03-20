import { SignInParams, SignWithTokenInParams } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const SignWithTokenSchema = Joi.object<SignWithTokenInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  tokenGitHub: Joi.string().required(),
});
