import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data file
const filePath = path.join(__dirname, '../data/users.json');

// Helper: Read users from file
function readUsers() {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Helper: Write users to file
function writeUsers(users) {
    writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export const getUsers = (req, res) => {
    const users = readUsers();
    res.json(users);
}

export const getOneUser = (req, res) => {
    res.send('Get One user by ID')
}

export const createUser = (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const users = readUsers();

        // Create new user
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
        };

        // Add to users array
        users.push(newUser);

        // Write to file
        writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export const updateUser = (req, res) => {
    res.send('Update a user by ID')
}

export const deleteUser = (req, res) => {
    res.send('Delete a user by ID')
}

// export { getUsers, getOneUser, createUser, updateUser, deleteUser }