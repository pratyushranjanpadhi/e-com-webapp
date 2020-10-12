import bcrypt from "bcryptjs";

const users = [
   {
      name: "Pratyush",
      email: "pratyush@pratyush.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
   },
   {
      name: "Barsha",
      email: "barsha@pratyush.com",
      password: bcrypt.hashSync("123456", 10),
   },
   {
      name: "Pinu",
      email: "pinu@pratyush.com",
      password: bcrypt.hashSync("123456", 10),
   },
];

export default users;
