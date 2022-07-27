type BlogPostProperty = {
  frontmatter: {
    title: string;
    date: string;
  };
  slug: string;
};

type BlogPost = BlogPostProperty & {
  id: string;
  rawBody: string;
};
