const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

//DATABASE
const users = [
    { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
    { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
    { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
    { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
];

// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
    res.json(users);
});

// GET : LIRE un utilisateur par ID
app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }
    res.json(user);
});

// POST : CRÉER un nouvel utilisateur
app.post("/", (req, res) => {
    const { firstName, lastName } = req.body;
    const lastId = users[users.length - 1].id;
    const newId = lastId + 1;
    
    const newUser = {
        id: newId,
        firstName,
        lastName
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT : MODIFIER un utilisateur existant
app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }
    
    const { firstName, lastName } = req.body;
    
    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;
    
    res.json({
        msg: "utilisateur mis à jour",
        user: users[userIndex]
    });
});

// DELETE : SUPPRIMER un utilisateur
app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({
        msg: "utilisateur supprimé",
        user: deletedUser
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});