var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        var from = 'Abhi';
        var text = 'Testing this function';
        var message = generateMessage(from,text);
        expect(message).toInclude({
            from,
            text
        });
        expect(message.createdAt).toBeA('number');
    });


});

describe('generateLocationMessage', () => {
    
        it('should generate correct Location message object', () => {
            var from = 'Abhi';
            var latitude = 1;
            var longitude = 2;
            
            var message = generateLocationMessage(from,latitude,longitude);
            expect(message).toInclude({
                from,
                url: `https://www.google.com/maps?q=1,2`
            });
            expect(message.createdAt).toBeA('number');
        });
    
    
    });
