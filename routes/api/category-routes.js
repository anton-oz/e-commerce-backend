const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
      order: [
        ['id', 'ASC'],
      ],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategory) {
      res.status(404).json({ error: "Category with that id not found."});
      return
    };
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body.category_name) {
    res.status(400).json({ error: "cannot create a category with no name" });
    return
  }
  try {
    const createCategory = await Category.create(req.body);
    if (!createCategory) {
      res.status(400).json({ error: "error creating tag" });
      return;
    };
    res.status(201).json({ success: `${req.body.category_name} category created.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if (!req.body.category_name) {
    res.status(400).json({ error: "cannot update a category with no name" });
    return
  }
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ error: "Category with that id does not exist" });
      return;
    }
    res.status(201).json({ success: `Category with id ${req.params.id} updated to ${req.body.category_name}.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory){
      res.status(404).json({ error: "category with that id not found" });
      return;
    }
    res.status(200).json({ success: `category with id ${req.params.id} destroyed.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
