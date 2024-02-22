const fs = require("fs");
class User {
  username;
  password;
  role;
  age;
  constructor(username, password, role, age) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.age = age;
  }

}

function writeUser(username, password, role,age) {
  fs.writeFile('..' + `/users/${username}.json`, JSON.stringify(
    new User(username, password, role, age)), (err) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(username + " written");
    }
  })
}

writeUser('1', '1', 'user', '20')
writeUser('admin', 'admin', 'admin', '40')


