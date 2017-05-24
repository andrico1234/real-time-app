class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {

        let userToRemove = this.users.filter((user) => {

            return user.id === id;
        });

        let newUsersList = this.users.filter((user) => {

            return user.id !== id;
        });

        this.users = newUsersList;

        if (userToRemove.length < 1) {

            return 'User was not found';
        }

        return userToRemove[0].name;
    }

    getUser(id) {

        let userToGet = this.users.filter((user) => {

            return user.id === id;
        });

        if (userToGet.length < 1) {

            return 'User was not found';
        }

        return userToGet[0].name;
    }

    getUserList(room) {

        let users = this.users.filter((user) => {

            return user.room === room;
        });

        var namesArray = users.map((user) => {

            return user.name;
        });

        return namesArray;
    }
}

module.exports = {
    Users
};