'use strict'

/* global describe, it */

const chai = require('chai')

const Checker = require('../src/checker')

var assert = chai.assert

describe('Checker', function () {
  describe('#constructor()', function () {
    it('should initializes properly all properties', function () {
      var instance = new Checker('name', 'value')

      assert.equal(instance.paramName, 'name')
      assert.equal(instance.paramValue, 'value')
      assert.equal(instance.paramType, 'string')
    })

    it('paramName is required', function () {
      assert.throw(() => new Checker(), /The parameter 'paramName' is required/)
    })

    it('paramName is a string', function () {
      assert.throw(() => new Checker(''), /The parameter 'paramName' is required/)
      assert.throw(() => new Checker(17), /The parameter 'paramName' should be a string/)
    })
  })

  var tests = [
    { value: undefined, defined: false, assigned: false, required: false },
    { value: null, defined: true, assigned: false, required: false },
    { value: false, defined: true, assigned: true, required: false },
    { value: true, defined: true, assigned: true, required: true },
    { value: 0, defined: true, assigned: true, required: false },
    { value: 42, defined: true, assigned: true, required: true },
    { value: 3.14, defined: true, assigned: true, required: true },
    { value: NaN, defined: true, assigned: true, required: false },
    { value: Number.POSITIVE_INFINITY, defined: true, assigned: true, required: true },
    { value: Number.POSITIVE_INFINITY, defined: true, assigned: true, required: true },
    { value: '', defined: true, assigned: true, required: false },
    { value: 'false', defined: true, assigned: true, required: true },
    { value: [], defined: true, assigned: true, required: true },
    { value: [1, 2], defined: true, assigned: true, required: true },
    { value: {}, defined: true, assigned: true, required: true },
    { value: {v: 't'}, defined: true, assigned: true, required: true }
  ]

  describe('#isDefined()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.defined) {
          instance.isDefined()
        } else {
          assert.throw(() => instance.isDefined(), /The parameter 'name' should be defined/)
        }
      })
    })
  })

  describe('#isAssigned()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.assigned) {
          instance.isAssigned()
        } else {
          assert.throw(() => instance.isAssigned(), /The parameter 'name' should be assigned/)
        }
      })
    })
  })

  describe('#isRequired()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.required) {
          instance.isRequired()
        } else {
          assert.throw(() => instance.isRequired(), /The parameter 'name' is required/)
        }
      })
    })
  })
})
