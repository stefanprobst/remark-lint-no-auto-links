const rule = require('unified-lint-rule')
const visit = require('unist-util-visit')
const position = require('unist-util-position')
const isGenerated = require('unist-util-generated')

module.exports = rule('remark-lint:no-auto-links', noAutoLinks)

const { start, end } = position

const reason = 'Automatic links are forbidden in MDX.'

function noAutoLinks(tree, vfile) {
  visit(tree, 'link', visitor)

  function visitor(node) {
    if (isGenerated(node)) return

    const { children } = node

    if (
      start(node).column === start(children[0]).column - 1 &&
      end(node).column === end(children[children.length - 1]).column + 1
    ) {
      vfile.message(reason, node)
    }
  }
}
