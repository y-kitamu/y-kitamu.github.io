import { graphql } from "gatsby";
import * as React from "react";

/**
 * Show the blog posts in the given category.
 */
const BlogCategory = ({ data }: any) => {
  return <></>;
};

export const query = graphql`
  query ($category: String) {
    markdownRemark(frontmatter: { category: { eq: $category } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      rawMarkdownBody
    }
  }
`;

export default BlogCategory;
