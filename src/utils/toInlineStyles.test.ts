import toInlineStyles from '@/utils/toInlineStyles'

describe('toInlineStyles module test: ', () => {
  const styleClassExample = {
    backgroundColor: 'red',
    display: 'flex',
    marginTop: '22px',
  }

  test('toInlineStyles function test', () => {
    expect(toInlineStyles(styleClassExample)).toBe(
      'background-color: red;display: flex;margin-top: 22px;',
    )
  })
})
