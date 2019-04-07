const fs = require('fs')
const fun = require('funstream')

exports.onCreateNode = async ({ node, actions, createContentDigest }) => {
  if (node.extension !== `ndjson`) {
    return
  }

  await fun(fs.createReadStream(node.absolutePath))
    .ndjson()
    .forEach(item => actions.createNode({
      ...item,
      internal: {
        contentDigest: createContentDigest(item),
        type: node.sourceInstanceName
      }
    }))
}
