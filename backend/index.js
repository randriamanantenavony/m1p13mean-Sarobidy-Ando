const express = require('express')

const app = express();

// Exemple de route
app.get('/', (req, res) => {
  res.send('Hello MEAN backend!');
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
