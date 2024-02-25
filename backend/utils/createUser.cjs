const fs = require("fs");
class User {
  username;
  password;
  role;
  age;
  firstname;
  lastname;
  constructor(username, password, role, age, firstname, lastname) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.age = age;
    this.firstname = firstname;
    this.lastname = lastname;
  }
  write() {
    fs.writeFile('..' + `/users/${this.username}.json`, JSON.stringify(this), (err) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(this.username + " written");
      }
    })
  }
}


new User('1', '1', 'user', '20', "Даниил", "Мягков").write()
new User('admin', 'admin', 'admin', '40', "Анатолий", "Иванов").write()


