const slugify = require(`slugify`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    createNodeField({
      node,
      name: `slug`,
      value: `${slugify(getNode(node.parent).name)}`,
    });
  }
};
