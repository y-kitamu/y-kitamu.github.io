import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";

type MainFeaturedPostProps = {
  post: BlogPost;
};

const BlogMainFeaturedPost = (props: MainFeaturedPostProps) => {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        // <img
        //   style={{ display: "none" }}
        //   src={post.image}
        //   alt={post.imageText}
        // />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <CardActionArea
          component="a"
          href={`/blog/${post.fields.slug.replace(".", "-")}`}
        >
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {post.frontmatter.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {post.body.substring(0, 100)}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {"Continue reading…"}
              </Typography>
            </Box>
          </Grid>
        </CardActionArea>
      </Grid>
    </Paper>
  );
};

export default BlogMainFeaturedPost;
