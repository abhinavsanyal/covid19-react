
class User{

    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id != id); 
        }
       
        return user;

    }

    getUserList(room){
        var userList = this.users.filter((user) => user.room===room);
        var list = userList.map((user) => user.name);
        return list;
    }
}

module.exports = { User}