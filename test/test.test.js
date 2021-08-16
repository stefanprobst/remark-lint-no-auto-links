import * as fs from 'fs'
import * as path from 'path'
import { remark } from 'remark'
import lint from 'remark-lint'
import noAutoLinks from '../src'

const processor = remark().use(lint).use(noAutoLinks)

const fixture = fs.readFileSync(
  path.join(process.cwd(), 'test', 'fixtures', 'test.mdx'),
  { encoding: 'utf-8' },
)

it('should warn for autolinks', () => {
  const { messages } = processor.processSync(fixture)
  expect(messages.length).toBe(1)
  expect(messages[0].message).toBe('Automatic links are forbidden in MDX.')
})
