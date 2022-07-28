import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

type HeaderProps = {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
};

const BlogHeader = (props: HeaderProps) => {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href="/blog" underline="hover" color="inherit">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={`/blog/${section.title.toLowerCase()}`}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default BlogHeader;
