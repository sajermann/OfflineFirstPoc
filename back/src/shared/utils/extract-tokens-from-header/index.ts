import { Request } from 'express';

export function extractTokensFromHeader(request: Request) {
  // console.log(request.headers);
  try {
    const token =
      request.headers.authorization?.replace('Bearer ', '') || undefined;
    const refresh_token = request.headers['refresh_token'] as string;
    return { token, refresh_token };
  } catch {
    return { token: undefined, refresh_token: undefined };
  }
}
