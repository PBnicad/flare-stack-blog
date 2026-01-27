import { createServerFn } from "@tanstack/react-start";
import {
  FindPostBySlugInputSchema,
  FindRelatedPostsInputSchema,
  GetPostsCursorInputSchema,
} from "@/features/posts/posts.schema";
import * as PostService from "@/features/posts/posts.service";
import {
  createCacheHeaderMiddleware,
  createPublicRateLimitMiddleware,
} from "@/lib/middlewares";

export const getPostsCursorFn = createServerFn()
  .middleware([
    createPublicRateLimitMiddleware({
      capacity: 60,
      interval: "1m",
      key: "posts:getCursor",
    }),
    createCacheHeaderMiddleware("public"),
  ])
  .inputValidator(GetPostsCursorInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.getPostsCursor(context, data);
  });

export const findPostBySlugFn = createServerFn()
  .middleware([
    createPublicRateLimitMiddleware({
      capacity: 60,
      interval: "1m",
      key: "posts:findBySlug",
    }),
    createCacheHeaderMiddleware("public"),
  ])
  .inputValidator(FindPostBySlugInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.findPostBySlug(context, data);
  });

export const getRelatedPostsFn = createServerFn()
  .middleware([
    createPublicRateLimitMiddleware({
      capacity: 120, // Higher limit for related posts as it's auto-fetched
      interval: "1m",
      key: "posts:getRelated",
    }),
    createCacheHeaderMiddleware("public"),
  ])
  .inputValidator(FindRelatedPostsInputSchema)
  .handler(async ({ data, context }) => {
    return await PostService.getRelatedPosts(context, data);
  });
