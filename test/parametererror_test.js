'use strict'

/* global describe, it */

const chai = require('chai')

const ParameterError = require('../src/parametererror')

var assert = chai.assert

describe('ParameterError', function () {
  describe('#constructor()', function () {
    it('should initializes properly all properties', function () {
      var instance = new ParameterError('test message')

      assert.equal(instance.message, 'test message')
      assert.equal(instance.name, 'ParameterError')
      assert.notEqual(instance.stack, '')
    })

    it('should enforce message parameter', function () {
      assert.throw(() => new ParameterError(), /The parameter 'message' is required/)
    })
  })
})
