export type BlogPostProperty = {
  frontmatter: {
    title: string;
    date: string;
  };
  slug: string;
};

export type BlogPost = BlogPostProperty & {
  id: string;
  rawBody: string;
};

export type Locale = "en" | "ja";

export type ConstantText = {
  Blog: {
    Description: string;
  };
};

export const localeText: { [key in Locale]: ConstantText } = {
  en: {
    Blog: {
      Description: "Blog",
    },
  },
  ja: {
    Blog: {
      Description: "日々勉強したことや気付きなどを記録していくブログ",
    },
  },
};
