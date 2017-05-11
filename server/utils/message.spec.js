var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {

    it('should generate the correct message object', () => {

        var res = generateMessage('hello', 'this is rico');

        expect(res.from).toEqual('hello');
        expect(res.text).toEqual('this is rico');
        expect(res.createdAt).toEqual(jasmine.any(String));
    });
});

describe('generate location message', () => {

   it('should generate correct location object', () => {

       var lat = 51.4624592;
       var long = -0.0351426;
       var res = generateLocationMessage('Admin', lat, long);

       expect(res.from).toEqual('Admin');
       expect(res.url).toEqual(`https://www.google.com/maps?q${lat},${long}`);
       expect(res.createdAt).toEqual(jasmine.any(String));
   })
});