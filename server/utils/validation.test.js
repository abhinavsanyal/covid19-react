const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString' , () => {

    it('should return false for empty input', () => {

        var result = isRealString('');
        expect(result).toBe(false);
    })

    it('should return false for number input', () => {
        
        var result = isRealString(14);
        expect(result).toBe(false);
    })

    it('should return true for string input', () => {
        
        var result = isRealString('yes');
        expect(result).toBe(true);
    })
})