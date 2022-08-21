import * as React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import BlogLayout from "../../components/blog/layout";
import {
  Box,
  Divider,
  Typography,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import "../../style.css";

const components = {
  // h1: (props: any) => <Typography component="h1" variant="h3" {...props} />,
  p: (props: any) => (
    <Box sx={{ ml: "2rem" }}>
      <Typography component="p" variant="body1" {...props} />
    </Box>
  ),
  h1: (props: any) => (
    <Box sx={{ mt: "2rem", mb: "2rem" }}>
      <Typography component="h1" variant="h4" {...props} />
    </Box>
  ),
  h2: (props: any) => (
    <Box sx={{ m: "1rem" }}>
      <Typography component="h2" variant="h6" {...props} />
    </Box>
  ),
  table: (props: any) => <Table {...props} sx={{ m: "2rem" }} />,
  tr: (props: any) => <TableRow>{props.children}</TableRow>,
  td: (props: any) => <TableCell>{props.children}</TableCell>,
  th: (props: any) => <TableCell variant={"head"}>{props.children}</TableCell>,
};

const BlogPostTemplate = ({ data, children }: any) => {
  return (
    <MDXProvider components={components}>
      <BlogLayout>
        <p>{data.mdx.frontmatter.date}</p>
        <Typography component="h1" variant="h3">
          {data.mdx.frontmatter.title}
        </Typography>
        <Divider />
        {children}
      </BlogLayout>
    </MDXProvider>
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

export default BlogPostTemplate;
