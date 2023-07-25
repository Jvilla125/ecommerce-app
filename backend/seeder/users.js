const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
    {
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        // bcrypt secures the users password when stored in the database
        password: bcrypt.hashSync('admin@admin.com', 10),
        isAdmin: true,
    },
    {
        _id: ObjectId("625add3d78fb449f9d9fe2ee"),
        name: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: bcrypt.hashSync('john@doe.com', 10),
        
    },
]

module.exports = users