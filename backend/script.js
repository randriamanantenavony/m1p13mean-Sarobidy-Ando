const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category_products');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

const categories = [
  { name: 'mode', description: 'Vêtements et accessoires' },
  { name: 'restauration', description: 'Food court, café' },
  { name: 'electronique', description: 'Gadgets et appareils' },
  { name: 'beaute', description: 'Cosmétiques, salons' },
  { name: 'services', description: 'Banque, assurance, services' },
  { name: 'divertissement', description: 'Cinéma, loisirs' }
];

const seedCategories = async () => {
  try {
    await Category.deleteMany(); // vide la collection avant insertion (optionnel)
    const created = await Category.insertMany(categories);
    console.log('Catégories insérées :', created);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
