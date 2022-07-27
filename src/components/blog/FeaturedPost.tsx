import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

type FeaturedPostProps = {
  post: BlogPost;
};

const BlogFeaturedPost = (props: FeaturedPostProps) => {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={`/blog/${post.slug.replace(".", "-")}`}
      >
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.frontmatter.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.frontmatter.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.rawBody.substring(0, 100)}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default BlogFeaturedPost;
