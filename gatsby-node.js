const slugify = require(`@sindresorhus/slugify`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `slug`,
      value: `${slugify(getNode(node.parent).name)}`,
    });
  }
};
