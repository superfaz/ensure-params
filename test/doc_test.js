'use strict'

/* global describe, it */

const chai = require('chai')

var assert = chai.assert

describe('Documentation', function () {
  describe('readme.md', function () {
    it('basic usage', function () {
      const ensure = require('../src/ensure')

      class HelloSomeone {
        static print (name) {
          ensure.param('name', name)
            .isRequired()
            .isString()
          console.log('Hello ' + name)
        }
      }

      HelloSomeone.print('test')
      assert.throw(() => HelloSomeone.print())
      assert.throw(() => HelloSomeone.print(null))
      assert.throw(() => HelloSomeone.print(1))
    })
  })

  describe('Checker class', function () {
    it('chaining', function () {
      const Checker = require('../src/checker')

      var checker = new Checker('param', 'test')
      checker.isRequired().isString()
    })
  })
})
