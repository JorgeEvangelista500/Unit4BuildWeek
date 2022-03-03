const db = require('../data/db-config')

function getAllRecipes() { 
    return db('recipe') 
}

function findById(id){
    return db('recipe').where('id', id).first()
}

function findBy(filter){
    return  db('recipe').where(filter)
}

async function insertRecipe(recipe) {
    const [newRecipeObject] = await db('recipe').insert(recipe, ['title', 'source','ingredients','instructions','category'])
    return newRecipeObject 
}

const update = (id, recipe ) => {
    db('recipe').where({ id:id }).update(recipe).then(recipe)
    return findById(id)
}

const deleteById = id => {
    const results = findById(id);
    return db('recipe').where({ id: id }).del().then(results)
}

module.exports = {
    getAllRecipes,
    findById,
    findBy,
    insertRecipe,
    update,
    deleteById,
}