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

        let userToRemove = this.getUser(id);

        if (userToRemove) {

            this.users = this.users.filter((user) => {

                return user.id !== id;
            });
        }

        return userToRemove;
    }

    getUser(id) {

        let userToGet = this.users.filter((user) => {

            return user.id === id;
        });

        if (userToGet.length < 1) {

            return 'User was not found';
        }

        return userToGet;
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