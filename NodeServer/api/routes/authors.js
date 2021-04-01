const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

/**
 * GET request to /authors
 */
router.get('/',async (req, res, next) => {
    const author = await authorController.getAllAuthors();
    res.status(200).json({
        message: 'All Authors were fetched',
        author
    });
});

/**
 * GET request to /authors/id
 * req.query is used for search query parameters 
 * (i.e. everything after ? in http://something.com/path?foo=var)
 */
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'Author was fetch '+id
    });
});

/**
 * PUT:  Used to create a resource, or overwrite it. While you specify the resources new URL.
 * POST: Used to modify and update a resource   
*/

router.post("/", async (req, res, next) => {
    const author = await authorController.createAuthor(req.body.name, req.body.books)
    res.status(201).json({
        message: "Created successfully",
        author
    })
});
  

module.exports = router;