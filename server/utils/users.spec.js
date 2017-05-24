const {Users} = require('./users');

describe('the users class', () => {

    var users;
    beforeEach(() => {

        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Fans of Muse'
        }, {
            id: 2,
            name: 'Adrian',
            room: 'Fans of Arcane Roots'
        }, {
            id: 3,
            name: 'Julian',
            room: 'Fans of Arcane Roots'
        }];
    });

    it('should add new user', () => {

        var users = new Users();
        var user = {
            id: 123,
            name: 'Andrico',
            room: 'rico is sexy'
        };

        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for arcane roots fans', () => {

        var userList = users.getUserList('Fans of Arcane Roots');

        expect(userList).toEqual(['Adrian', 'Julian']);
    });

    it('should remove user', () => {

        var userList = users.removeUser(1);

        expect(userList).toEqual([{
            id: 1,
            name: 'Mike',
            room: 'Fans of Muse'
        }]);
        expect(users.users).not.toContain([{name: 'Mike'}]);
    });

    it('should not remove user', () => {

        var notDeleted = users.removeUser(4);

        expect(notDeleted).toEqual('User was not found');
    });

    it('should find user', () => {

        var userList = users.getUser(2);

        expect(userList).toEqual([{
            id: 2,
            name: 'Adrian',
            room: 'Fans of Arcane Roots'
        }]);
    });

    it('should not find user', () => {

        var userList = users.getUser(34);

        expect(userList).toEqual('User was not found');
    });
});