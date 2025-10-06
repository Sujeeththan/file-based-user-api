import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/users.json');


function readUsers() {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}


function writeUsers(users) {
    writeFileSync(filePath, JSON.stringify(users, null, 2));
}


const getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};


 const getUserById = (req, res) => {
   const users = readUsers();
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
};


const createUser = (req, res) => {
  const users = readUsers();

  const email = req.body.email;
 const userEmail = users.find(user => user.email === email);
 if (userEmail) {
    return res.status(404).send('email is already registered');
  }
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);

  writeUsers(users);
  res.status(201).send("user added");
};


const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).send('User not found');
  }
  const updatedUser = {
    id: req.params.id
  };
  users[index] = updatedUser;
  res.status(200).json('User updated');
};


 const deleteUser = (req, res) => {
  const users = readUsers();
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (!index === -1) {
    return res.status(404).send('User not found');
  }
  users.splice(index, 1);
  writeUsers(users);
  res.status(200).json('User deleted');
};

export { getAllUsers,
         getUserById,
         createUser,
         updateUser,
         deleteUser }