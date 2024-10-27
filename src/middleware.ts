import { createMiddleware, MiddlewareConfig } from "@rescale/nemo";
import {
  authMiddleware,
  authMiddlewareMatcher,
  blockedPageMiddleware,
  blockedPageMiddlewareMatcher,
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
};

export default createMiddleware(middlewares);
