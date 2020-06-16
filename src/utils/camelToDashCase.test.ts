import camelToDashCase from '@/utils/camelToDashCase'

describe('camelToDashCase module test: ', () => {
  test('convert className to class-name using camelToDashCase function', () => {
    expect(camelToDashCase('className')).toBe('class-name')
    expect(camelToDashCase('helloWorldHelloWorld')).toBe('hello-world-hello-world')
  })
})
