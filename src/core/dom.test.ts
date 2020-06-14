import $, { AppNode } from '@/core'

describe('dom module - custom library for interact with html DOM', () => {
  let $customNode: AppNode

  beforeEach(() => {
    const htmlNode = document.createElement('div')
    htmlNode.innerHTML = 'Hello world'

    $customNode = $(htmlNode)
  })

  test('html method test like a getter', () => {
    expect($customNode.html()).toBe('<div>Hello world</div>')
  })

  test('html method test like a setter', () => {
    $customNode.html('<p>Paragraph with news.</p>')
    expect($customNode.html()).toBe('<div><p>Paragraph with news.</p></div>')

    $customNode.html('')
    expect($customNode.html()).toBe('<div></div>')
  })

  test('text method test like a getter', () => {
    expect($customNode.text()).toBe('Hello world')
  })

  test('text method test like a getter for input tag', () => {
    const nativeHtmlInput = document.createElement('input')
    nativeHtmlInput.setAttribute('type', 'text')
    nativeHtmlInput.value = 'Abra-cadabra'

    const $input = $(nativeHtmlInput)

    expect($input.text()).toBe('Abra-cadabra')
  })

  test('text method test like a setter', () => {
    $customNode.text('Paragraph with events.')
    expect($customNode.text()).toBe('Paragraph with events.')

    $customNode.html('')
    expect($customNode.text()).toBe('')
  })

  test('clear method test', () => {
    $customNode.clear()
    expect($customNode.text()).toBe('')
  })

  test('append method test, using native html node', () => {
    const htmlNativeNode = document.createElement('div')
    htmlNativeNode.innerHTML = 'qwerty'
    $customNode.append(htmlNativeNode)
    expect($customNode.html()).toBe('<div>Hello world<div>qwerty</div></div>')
  })

  test('append method test, using custom html node (AppNode)', () => {
    const $appNode = $(document.createElement('div'))
    $appNode.text('qwerty123')
    $customNode.append($appNode)
    expect($customNode.html()).toBe('<div>Hello world<div>qwerty123</div></div>')
  })

  test('css and getStyles methods test', () => {
    $customNode.css({
      background: 'red',
      'background-color': 'blue',
    })

    expect($customNode.html()).toBe(
      '<div style="background: red; background-color: blue;">Hello world</div>',
    )

    expect($customNode.getStyles(['backgroundColor'])).toEqual({
      backgroundColor: 'blue',
    })
    expect($customNode.getStyles(['background-color'])).toEqual({
      'background-color': 'blue',
    })

    expect($customNode.getStyles(['top'])).toEqual({
      top: '',
    })
  })

  test('addClass and removeClass methods test', () => {
    $customNode.addClass('container')
    expect(($customNode.html() as string).includes('container')).toBe(true)

    $customNode.removeClass('container')
    expect(($customNode.html() as string).includes('container')).not.toBe(true)
  })

  test('attr method test like a setter and getter', () => {
    const htmlNode = document.createElement('div')
    htmlNode.setAttribute('data-value', 'abc')
    htmlNode.setAttribute('data-radius', '90')
    const $appNode = $(htmlNode)

    expect(($appNode.html() as string).includes('data-value="abc"')).toBeTruthy()
    expect($appNode.attr('data-radius')).toBe('90')
  })
})
