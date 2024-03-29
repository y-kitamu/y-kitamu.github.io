import * as React from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import { graphql } from "gatsby";
import BlogSidebar from "../../components/blog/Sidebar";
import BlogLayout from "../../components/blog/layout";
import { localeText, BlogPostData, BlogPostProperty } from "../../constants";
import { Box, Divider, Pagination, Paper, Typography } from "@mui/material";
import BlogPost from "../../components/blog/Post";

const MDX_HEADER_REGEX = /---[^]*---[\n\r]*/;
const POSTS_PER_PAGE = 10;

const BlogMainPage = ({ data }: { data: any }) => {
  const [currentPage, setCurrentPage] = React.useState(0); //  pagenation用のindex

  if (data.featuredPosts.nodes.length === 0) {
    return <BlogLayout>{"No articles posted."}</BlogLayout>;
  }

  data.featuredPosts.nodes.map((node: BlogPostData) => {
    node.rawMarkdownBody = node.rawMarkdownBody.replace(MDX_HEADER_REGEX, "");
  });

  const latestPost: BlogPostData = data.featuredPosts.nodes[0];
  const recentPosts: BlogPostData[] = [
    data.featuredPosts.nodes[1],
    data.featuredPosts.nodes[2],
  ];

  const numOtherPosts = data.otherPosts.nodes.length;
  const currentPagePosts: BlogPostProperty[] = data.otherPosts.nodes.slice(
    currentPage * POSTS_PER_PAGE,
    (currentPage + 1) * POSTS_PER_PAGE
  );

  const sidebar = {
    title: "About",
    description: localeText.ja.Blog.Description,
    social: [
      { name: "GitHub", icon: GitHubIcon, link: "https://github.com/y-kitamu" },
    ],
  };

  return (
    <BlogLayout>
      {/* 特集記事を強調表示 */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <BlogPost
          key={latestPost.fields.slug}
          post={latestPost}
          theme={{ title: "h4", date: "h5", body: "h5", more: "h5" }}
        />
      </Paper>
      {recentPosts.map((post, idx) => {
        if (post !== undefined) {
          return <BlogPost key={post.fields.slug} post={post} />;
        } else {
          return <div key={idx}></div>;
        }
      })}
      <Grid container spacing={5} sx={{ mt: 3 }}>
        {/* その他の記事を一覧表示 */}
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
          {currentPagePosts.map((post) => (
            <BlogPost key={post.fields.slug} post={post} />
          ))}

          <Divider />
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Pagination
              page={currentPage + 1}
              onChange={(_, value) => setCurrentPage(value - 1)}
              count={Math.floor(
                (numOtherPosts + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE
              )}
            />
          </Box>
        </Grid>
        <BlogSidebar
          title={sidebar.title}
          description={sidebar.description}
          social={sidebar.social}
        />
      </Grid>
    </BlogLayout>
  );
};

export const query = graphql`
  query {
    featuredPosts: allMarkdownRemark(
      limit: 3
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        fields {
          slug
        }
        id
        rawMarkdownBody
      }
    }
    otherPosts: allMarkdownRemark(
      skip: 3
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default BlogMainPage;
