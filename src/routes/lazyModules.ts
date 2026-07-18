import { lazy } from "react";

export const BlogPage = lazy(
  () => import("../modules/guide_blog/FunctionPage")
);
