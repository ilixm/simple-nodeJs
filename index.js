const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());



// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
	res.json(users)
})


//POST: ici, nous gérons les requêtes POST, et nous allons également avoir besoin des données dans le 'body'

app.post("/:id", (req, res) => { //Cela signifie que j'accepte un paramètre appelé 'id'
    /// etc
    })

// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
app.post("/", (req, res) => {
	// récupérer toutes les données qui arrivent dans le corps de la requête (body)
	const { firstName, lastName } = req.body

	// récupérer l'ID du dernier utilisateur en fonction du nombre d'utilisateurs dans notre variable de tableau 'users'.
	const lastId = users[users.length - 1].id
	// ajouter un pour créer un utilisateur unique
	const newId = lastId + 1

	// créer le nouvel utilisateur avec les données du corps de la requête et l'ID calculé
	const newUser = {
		firstName,
		lastName,
		id: newId,
	}

	// ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
	users.push(newUser)
	// envoyer le code de statut 201 (créé) et les données du nouvel utilisateur afin de confirmer au client.
	res.status(201).json(newUser)
})


//PUT: nous allons modifier un utilisateur en fonction de son ID passé en paramètre dans l'URL
app.put("/", (req, res) => {
	res.json({
		msg: "rest api PUT",
	})
})


//*DELETE : supprime un user basé sur le parametre passé dans l'url *
app.delete("/", (req, res) => {
	res.json({
	msg: "rest api delete",
	})
})



//DATABASE***********************************
const users = [
	{ id: 1, firstName: "John", lastName: "Doe", role: "admin" },
	{ id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
	{ id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
	{ id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
	{ id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
]


app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});





