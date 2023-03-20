import { request } from "./request";
import qs from "query-string";

async function exchangeCodeForAccessToken(code: string): Promise<string> {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await request.post(GITHUB_ACCESS_TOKEN_URL, params, config);

  const parsedData = qs.parse(data);
  const token = parsedData.access_token as string;
  return token;
}

async function fetchUser(token: string) {
  const response = await request.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { exchangeCodeForAccessToken, fetchUser };
