import { createMiddleware, MiddlewareConfig } from "@rescale/nemo";
import {
  authMiddleware,
  authMiddlewareMatcher,
  blockedPageMiddleware,
  blockedPageMiddlewareMatcher,
  forgotPasswordSentPageMiddleware,
  forgotPasswordSentPageMiddlewareMatcher,
  rateLimitMiddleware,
  rateLimitMiddlewareMatcher,
  unauthenticatedMiddleware,
  unauthenticatedMiddlewareMatcher,
  verifyEmailPageMiddleware,
  verifyEmailPageMiddlewareMatcher,
} from "./middlewares";

const middlewares: MiddlewareConfig = {
  [rateLimitMiddlewareMatcher]: rateLimitMiddleware,
  [authMiddlewareMatcher]: authMiddleware,
  [unauthenticatedMiddlewareMatcher]: unauthenticatedMiddleware,
  [blockedPageMiddlewareMatcher]: blockedPageMiddleware,
  [verifyEmailPageMiddlewareMatcher]: verifyEmailPageMiddleware,
  [forgotPasswordSentPageMiddlewareMatcher]: forgotPasswordSentPageMiddleware,
};

export default createMiddleware(middlewares);
