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
    try{const users = readUsers();
    res.json(users);
    } catch {
     res.status(500).json({ error: 'Failed to create user' });
    } 
};

 const getUserById = (req, res) => {
     try{const users = readUsers();
    res.json(users);
    } catch {
     res.status(404).json({ error: 'Failed to create user' });
    } 
    res.send('Get One user by ID')
}

 const createUser = (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const users = readUsers();

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
        };

        users.push(newUser);

        writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}


 const updateUser = (req, res) => {
     try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const users = readUsers();

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
        };

        users.push(newUser);

        writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
    res.send('Update a user by ID')
}

 const deleteUser = (req, res) => {
     try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const users = readUsers();

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
        };

        users.push(newUser);

        writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
    res.send('Delete a user by ID')
}

export { getUsers, getOneUser, createUser, updateUser, deleteUser }