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

  /**
   * All the values tested and the result expected for each call.
   * `true` means that the call should succeed
   * `false` means that an exception is triggered
   */
  var tests = [
    { value: undefined, defined: false, assigned: false, required: false, string: true, number: true, integer: true },
    { value: null, defined: true, assigned: false, required: false, string: true, number: true, integer: true },
    { value: false, defined: true, assigned: true, required: false, string: false, number: false, integer: false },
    { value: true, defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: 0, defined: true, assigned: true, required: false, string: false, number: true, integer: true },
    { value: 42, defined: true, assigned: true, required: true, string: false, number: true, integer: true },
    { value: 3.14, defined: true, assigned: true, required: true, string: false, number: true, integer: false },
    { value: NaN, defined: true, assigned: true, required: false, string: false, number: true, integer: false },
    { value: Number.POSITIVE_INFINITY, defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: Number.POSITIVE_INFINITY, defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: '', defined: true, assigned: true, required: false, string: true, number: false, integer: false },
    { value: 'false', defined: true, assigned: true, required: true, string: true, number: false, integer: false },
    { value: [], defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: [1, 2], defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: {}, defined: true, assigned: true, required: true, string: false, number: false, integer: false },
    { value: {v: 't'}, defined: true, assigned: true, required: true, string: false, number: false, integer: false }
  ]

  describe('#isDefined()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.defined) {
          assert.strictEqual(instance.isDefined(), instance)
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
          assert.strictEqual(instance.isAssigned(), instance)
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
          assert.strictEqual(instance.isRequired(), instance)
        } else {
          assert.throw(() => instance.isRequired(), /The parameter 'name' is required/)
        }
      })
    })
  })

  describe('#isString()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.string) {
          assert.strictEqual(instance.isString(), instance)
        } else {
          assert.throw(() => instance.isString(), /The parameter 'name' is not a string \(current value: .*\)/)
        }
      })
    })
  })

  describe('#isNumber()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.number) {
          assert.strictEqual(instance.isNumber(), instance)
        } else {
          assert.throw(() => instance.isNumber(), /The parameter 'name' is not a number \(current value: .*\)/)
        }
      })
    })
  })

  describe('#isInteger()', function () {
    tests.forEach(function (test) {
      it('correctly manage ' + test.value, function () {
        var instance = new Checker('name', test.value)
        if (test.integer) {
          assert.strictEqual(instance.isInteger(), instance)
        } else {
          assert.throw(() => instance.isInteger(), /The parameter 'name' is not an integer \(current value: .*\)/)
        }
      })
    })
  })
})
