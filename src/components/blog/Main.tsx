import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";

type MainProps = {
  posts: {
    frontmatter: {
      title: string;
      date: string;
    };
    slug: string;
    id: string;
    body: string;
  }[];
};

const BlogMain = (props: MainProps) => {
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {"From the firehose"}
      </Typography>
      <Divider />
      {props.posts.map((post) => {
        const { frontmatter, slug, id, body } = post;
        return (
          <Markdown className="markdown" key={body.substring(0, 40)}>
            {post}
          </Markdown>
        );
      })}
    </Grid>
  );
};

export default BlogMain;
