/* global it, xdescribe */

const expect = require('chai').expect
const getData = require('../lib/get-data')

xdescribe('get-data', () => {
  it('works', () => {
    expect(getData().foo).to.equal('bar')
  })
})
