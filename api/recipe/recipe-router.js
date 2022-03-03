const router = require('express').Router()
const Recipe = require('./recipe-model')


router.get('/', (req, res, next) => {
    Recipe.getAllRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Recipe.insertRecipe(req.body)
        .then(recipe => {
            res.status(201).json(recipe)
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Recipe.update(req.params.id, req.body)
        .then(recipe => {
            res.status(200).json(recipe)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Recipe.deleteById(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(next)
})


module.exports = router