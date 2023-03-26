import * as React from "react";
import Typography from "@mui/material/Typography";
import { graphql, useStaticQuery } from "gatsby";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { BlogPostData, BlogPostProperty } from "../../constants";
import default_image from "../../images/icon.png";

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

// markdown中の画像pathに一致するregex
const MDX_IMAGE_REGEX = /(\(|")(http|\.).*\.(png|jpg|jpeg|gif|bmp).* /i;

const isBlogPostData = (arg: unknown): arg is BlogPostData => {
  return (arg as BlogPostData).rawMarkdownBody !== undefined;
};

/**
 * サムネイル表示用の画像pathを記事の本文(`body`)から取得する。
 * 本文中の最初の画像をサムネイルとして使用する。
 * 本文中に画像がない場合はデフォルトのicon画像を返す。
 */
const getImagePath = (body: string): string => {
  const matches = body.match(MDX_IMAGE_REGEX);
  if (matches) {
    return matches[0].slice(1, -1);
  }
  return default_image;
};

/**
 * 記事のサマリーを表示するコンポーネント。
 * `post`に記事の本文が含まれている場合は、本文の一部を表示する。
 * @param post 記事のデータ
 */
const BlogPost = (props: BlogPostProps) => {
  const { post, theme = DEFAULT_THEME } = props;
  const blogPostTheme = {
    ...DEFAULT_THEME,
    ...theme,
  };

  // thumbnail用の画像の用意
  const withContent = isBlogPostData(post);
  let imagePath: string | undefined = undefined;
  if (withContent) {
    imagePath = getImagePath(post.rawMarkdownBody);
    const imageFiles = useStaticQuery(graphql`
      query {
        images: allFile(
          filter: { extension: { regex: "/(png|jpg|jpeg|gif|bmp)/i" } }
        ) {
          nodes {
            name
            publicURL
          }
        }
      }
    `);
    const targetFile = imageFiles.images.nodes.find(
      (node: { name: string; publicURL: string }) => {
        return node.publicURL.split("/").pop() === imagePath?.split("/").pop();
      }
    );
    if (targetFile !== undefined) {
      imagePath = targetFile.publicURL;
    }
    console.log(imagePath);
  }

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
          {withContent && (
            <Typography variant={blogPostTheme.body} paragraph>
              {post.rawMarkdownBody.substring(0, 100)}
            </Typography>
          )}
          <Typography variant={blogPostTheme.more} color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        {withContent && (
          <CardMedia
            component="img"
            image={imagePath}
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          />
        )}
      </Card>
    </CardActionArea>
  );
};

export default BlogPost;
