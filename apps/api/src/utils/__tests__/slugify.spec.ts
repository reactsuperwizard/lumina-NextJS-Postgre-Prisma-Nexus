import { expect } from 'chai'

import { slugify } from '../'

describe('slugify', () => {
  it('should correctly slugify customer name', () => {
    const zoomcare = slugify('Zoom Care')
    expect(zoomcare).equal('@zoomcare')
    const atZoomcare = slugify('@Zoom Care')
    expect(atZoomcare).equal('@zoomcare')
    const amn = slugify('AMN Health')
    expect(amn).equal('@amnhealth')
    const foobar = slugify('#@$@##$#@$#@@@#^&&***foo---Bar')
    expect(foobar).equal('@foobar')
  })
})
