import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'
import { pointStart, pointEnd } from 'unist-util-position'
import { generated as isGenerated } from 'unist-util-generated'

export default lintRule('remark-lint:no-auto-links', noAutoLinks)

const reason = 'Automatic links are forbidden in MDX.'

function noAutoLinks(tree, vfile) {
  visit(tree, 'link', visitor)

  function visitor(node) {
    if (isGenerated(node)) return

    const { children } = node

    if (
      pointStart(node).column === pointStart(children[0]).column - 1 &&
      pointEnd(node).column ===
        pointEnd(children[children.length - 1]).column + 1
    ) {
      vfile.message(reason, node)
    }
  }
}
