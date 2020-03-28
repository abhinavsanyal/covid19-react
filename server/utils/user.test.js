const expect = require('expect');
var {User} = require('./user');

describe('User',() => {


    var newUser;

    beforeEach(()=>{

        newUser = new User();
        newUser.users = [{
            id : '1',
            name : 'Abhi',
            room : 'the Room'
        },{
            id : '2',
            name : 'angshu',
            room : 'sick Room'
        },{
            id : '3',
            name : 'elon',
            room : 'the Room'
        }]
    });

    it('should add a new user' , () => {

        var newUser = new User();

        var user = {
            id : '23',
            name : 'Abhi',
            room : 'the Room'
        }

        var result = newUser.addUser(user.id,user.name,user.room);

        expect(result).toEqual(user);
        expect(newUser.users).toEqual([user]);
    })

    it('should return all users in the room named "the Room"',() =>{
        var users = newUser.getUserList('the Room');
        expect(users).toEqual(['Abhi','elon']);
    })

    it('should return the user in the room named "sick Room"',() =>{
        var users = newUser.getUserList('sick Room');
        expect(users).toEqual(['angshu']);
    })

    it('should return the user of id 2',() =>{
        var user = newUser.getUser('2');
        expect(user).toEqual(newUser.users[1]);
    })

    it('should remove the user of id 3',() =>{
        var user = newUser.getUser('3');
        var removedUser = newUser.removeUser('3');
        expect(removedUser).toEqual(user);
        expect(newUser.users.length).toBe(2);
        expect(newUser.users).toEqual([{
            id : '1',
            name : 'Abhi',
            room : 'the Room'
        },{
            id : '2',
            name : 'angshu',
            room : 'sick Room'
        }])
    })

    
})