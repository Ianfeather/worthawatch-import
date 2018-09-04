/* global it, describe */

const expect = require('chai').expect
const getData = require('../lib/get-data')

describe('get-data', () => {
  it('works', () => {
    expect(getData().foo).to.equal('hello')
  })
})
