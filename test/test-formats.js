/* globals describe, before, it */
const chai = require('chai');
const ajv = require('../');

const { expect } = chai;

describe('Formats', function testFormats() {
  this.timeout(30000);

  describe('handler', () => {
    let schema;
    let validate;
    before(() => {
      schema = {
        type: 'string',
        format: 'handler'
      };
      validate = ajv.compile(schema);
    });
    it('should successfully validate correct handler', () => {
      const isLowerValid = validate('a');
      const isNumberValid = validate('9');
      const isBothValid = validate('a9');
      expect(isLowerValid).to.equal(true);
      expect(isNumberValid).to.equal(true);
      expect(isBothValid).to.equal(true);
    });
    it('should be invalid for incorrect handler', () => {
      const isEmptyValid = validate('');
      const isUpperValid = validate('A');
      const isSpecialValid = validate('@');
      expect(isEmptyValid).to.equal(false);
      expect(isUpperValid).to.equal(false);
      expect(isSpecialValid).to.equal(false);
    });
  });

  describe('mail', () => {
    let schema;
    let validate;
    before(() => {
      schema = {
        type: 'string',
        format: 'mail'
      };
      validate = ajv.compile(schema);
    });

    it('should successfully validate correct email', () => {
      const case1 = validate('rrk.tom@gmail.com');
      const case2 = validate('rrk.999@gmail.com');
      expect(case1).to.equal(true);
      expect(case2).to.equal(true);
    });

    it('should be invalid for incorrect handler', () => {
      const case1 = validate('rrk@gmail');
      const case2 = validate('rrk@tom@gmail.com');
      const case3 = validate('rrk.t om@gmail.com');
      const case4 = validate('RRKTOM@gmail.com');
      expect(case1).to.equal(false);
      expect(case2).to.equal(false);
      expect(case3).to.equal(false);
      expect(case4).to.equal(false);
    });
  });

  describe('yyyy-mm-dd', () => {
    let schema;
    let validate;
    before(() => {
      schema = {
        type: 'string',
        format: 'yyyy-mm-dd'
      };
      validate = ajv.compile(schema);
    });

    it('should successfully validate correct date', () => {
      const case1 = validate('1997-06-06');
      const case2 = validate('9997-06-06');
      expect(case1).to.equal(true);
      expect(case2).to.equal(true);
    });
    it('should be invalid for incorrect date', () => {
      const case1 = validate('06-06-1997');
      const case2 = validate('1997-13-06');
      const case3 = validate('1997-03-32');
      const case4 = validate('1997-6-6');
      const case5 = validate('0997-06-06');
      expect(case1).to.equal(false);
      expect(case2).to.equal(false);
      expect(case3).to.equal(false);
      expect(case4).to.equal(false);
      expect(case5).to.equal(false);
    });
  });
});
