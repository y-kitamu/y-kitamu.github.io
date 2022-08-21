import * as React from "react";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import { graphql } from "gatsby";
import BlogMainFeaturedPost from "../../components/blog/MainFeaturedPost";
import BlogFeaturedPost from "../../components/blog/FeaturedPost";
import BlogMain from "../../components/blog/Main";
import BlogSidebar from "../../components/blog/Sidebar";
import BlogLayout from "../../components/blog/layout";
import { localeText, BlogPost } from "../../constants";

const MDX_HEADER_REGEX = /---[^]*---[\n\r]*/;

const BlogMainPage = ({ data }: { data: any }) => {
  if (data.featuredPosts.nodes.length === 0) {
    return <BlogLayout>{"No articles posted."}</BlogLayout>;
  }

  data.featuredPosts.nodes.map((node: BlogPost) => {
    node.body = node.body.replace(MDX_HEADER_REGEX, "");
  });

  const latestPost: BlogPost = data.featuredPosts.nodes[0];
  const recentPosts: BlogPost[] = [
    data.featuredPosts.nodes[1],
    data.featuredPosts.nodes[2],
  ];

  const sidebar = {
    title: "About",
    description: localeText.ja.Blog.Description,
    social: [
      { name: "GitHub", icon: GitHubIcon, link: "https://github.com/y-kitamu" },
      // { name: "Twitter", icon: TwitterIcon },
      // { name: "Facebook", icon: FacebookIcon },
    ],
  };

  return (
    <BlogLayout>
      <BlogMainFeaturedPost post={latestPost} />
      <Grid container spacing={4}>
        {recentPosts.map((post) => {
          if (post !== undefined) {
            return (
              <BlogFeaturedPost key={post.frontmatter.title} post={post} />
            );
          } else {
            return <></>;
          }
        })}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <BlogMain posts={data.otherPosts.nodes} />
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
    featuredPosts: allMdx(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
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
        body
      }
    }
    otherPosts: allMdx(
      skip: 3
      sort: { fields: frontmatter___date, order: DESC }
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
