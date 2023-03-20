import * as React from "react";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { BlogPostData, BlogPostProperty } from "../../constants";

type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline"
  | "inherit"
  | undefined;

type BlogPostTheme = {
  title: TypographyVariants;
  date: TypographyVariants;
  body: TypographyVariants;
  more: TypographyVariants;
};

type BlogPostProps = {
  post: BlogPostProperty | BlogPostData;
  theme?: BlogPostTheme;
};

const DEFAULT_THEME: BlogPostTheme = {
  title: "h5",
  date: "subtitle1",
  body: "subtitle1",
  more: "subtitle1",
};

const isBlogPostData = (arg: unknown): arg is BlogPostData => {
  return (arg as BlogPostData).body !== undefined;
};

/**
 * 記事のサマリーを表示するコンポーネント。
 * `post`に記事の本文が含まれている場合は、本文の一部を表示する。
 * @param post 記事のデータ
 */
const BlogPost = (props: BlogPostProps) => {
  const { post, theme = DEFAULT_THEME } = props;
  console.log(post);
  const blogPostTheme = {
    ...DEFAULT_THEME,
    ...theme,
  };

  return (
    <CardActionArea
      key={post.fields.slug}
      component="a"
      href={`/blog/${post.fields.slug.replace(".", "-")}`}
    >
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant={blogPostTheme.title}>
            {post.frontmatter.title}
          </Typography>
          <Typography variant={blogPostTheme.date} color="text.secondary">
            {post.frontmatter.date}
          </Typography>
          {isBlogPostData(post) && (
            <Typography variant={blogPostTheme.body} paragraph>
              {post.body.substring(0, 100)}
            </Typography>
          )}
          <Typography variant={blogPostTheme.more} color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
        />
      </Card>
    </CardActionArea>
  );
};

export default BlogPost;
