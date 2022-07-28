import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import BlogLayout from "../../components/blog/layout";
import { Divider, Typography } from "@mui/material";

const BlogPost = ({ data }: any) => {
  return (
    <BlogLayout>
      <p>{data.mdx.frontmatter.date}</p>
      <Typography component="h1" variant="h3">
        {data.mdx.frontmatter.title}
      </Typography>
      <Divider />
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </BlogLayout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

export default BlogPost;
