import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Pagination,
} from "@mui/material";

const POSTS_PER_PAGE = 10;

type MainProps = {
  posts: BlogPostProperty[];
};

const BlogMain = (props: MainProps) => {
  const { posts } = props;
  console.log(posts);
  const [currentPage, setCurrentPage] = React.useState(0);

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
        {"Recent posts"}
      </Typography>
      <Divider />
      {posts
        .slice(currentPage * POSTS_PER_PAGE, (currentPage + 1) * POSTS_PER_PAGE)
        .map((post) => {
          return (
            <CardActionArea
              key={post.slug}
              component="a"
              href={`/blog/${post.slug.replace(".", "-")}`}
              sx={{ m: 2 }}
            >
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {post.frontmatter.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.frontmatter.date}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Continue reading...
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          );
        })}
      <Divider />
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Pagination
          page={currentPage + 1}
          onChange={(_, value) => setCurrentPage(value - 1)}
          count={(posts.length + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE}
        />
      </Box>
    </Grid>
  );
};

export default BlogMain;
