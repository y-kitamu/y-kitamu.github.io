import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { graphql, useStaticQuery } from "gatsby";

type CopyrightProps = {
  siteTitle: string;
  siteUrl: string;
};

const Copyright = ({ siteTitle, siteUrl }: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={siteUrl}>
        {siteTitle}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

type FooterProps = {
  description: string;
  title: string;
};

const BlogFooter = (props: FooterProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);

  const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright
          siteTitle={data.site.siteMetadata.title as string}
          siteUrl={data.site.siteMetadata.siteUrl as string}
        />
      </Container>
    </Box>
  );
};

export default BlogFooter;
