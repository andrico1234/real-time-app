var {generateMessage} = require('./message');

describe('generate message', () => {

    it('should generate the correct message object', () => {

        var res = generateMessage('hello', 'this is rico');

        expect(res.from).toEqual('hello');
        expect(res.text).toEqual('this is rico');
        expect(res.createdAt).toEqual(jasmine.any(String));
    });
});