import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useStaticQuery, graphql } from "gatsby";
import { Container } from "@mui/material";
import BlogHeader from "./Header";
import BlogFooter from "./Footer";

const categories = [
  { title: "Programming", url: "#" },
  { title: "Deep Learning", url: "#" },
  { title: "Book", url: "#" },
  { title: "Other", url: "#" },
];

const theme = createTheme();

type props = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <BlogHeader
          title={data.site.siteMetadata.title}
          sections={categories}
        />
        <main>{children}</main>
      </Container>
      <BlogFooter title="" description="" />
    </ThemeProvider>
  );
};

export default BlogLayout;
