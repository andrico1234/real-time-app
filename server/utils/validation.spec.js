const {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non string values', () => {

        var nonString = 95;
        expect(isRealString(nonString)).toBe(false);
    });

    it('should reject string with only spaces', () => {

        var spaceString = '   ';
        console.log(isRealString('    '));
        expect(isRealString(spaceString)).toBe(false);
    });

    it('should allow strings with non space characters', () => {

        var legitString = 'Totally Legit';
        expect(isRealString(legitString)).toBe(true);
    });
});