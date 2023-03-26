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
  p: (props: any) => (
    <Box sx={{ ml: "2rem" }}>
      <Typography component="span" variant="body1" {...props} />
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

const BlogPostTemplate = (props: any) => {
  console.log("props: ", props);
  const { data } = props;
  return (
    <MDXProvider components={components}>
      <BlogLayout>
        <p>{data.markdownRemark.frontmatter.date}</p>
        <Typography component="h1" variant="h3">
          {data.markdownRemark.frontmatter.title}
        </Typography>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </BlogLayout>
    </MDXProvider>
  );
};

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      html
    }
  }
`;

export default BlogPostTemplate;
