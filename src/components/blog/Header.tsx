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
  const { title } = props;

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
    </React.Fragment>
  );
};

export default BlogHeader;
