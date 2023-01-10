import { expect } from 'chai'

import { hashids } from '..'

describe('hashids', () => {
  const one = hashids.encode(1)
  const two = hashids.encode(2)
  const fourhundred = hashids.encode(400)

  it('should not create hashes less than 4 characters', () => {
    expect(one).to.have.lengthOf.at.least(2)
    expect(two).to.have.lengthOf.at.least(4)
    expect(fourhundred).to.have.lengthOf.at.least(4)
  })

  it('should not have upper case characters', () => {
    expect(one).to.equal(one.toLowerCase())
    expect(two).to.equal(two.toLowerCase())
    expect(fourhundred).to.equal(fourhundred.toLowerCase())
  })
})
