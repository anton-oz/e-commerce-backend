const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ 
        model: Product, 
        through: {
          attributes: ['id', 'tag_id', 'product_id'],
        },
      }],
      order: [
        ['id', 'ASC']
      ],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id,
      {
        include: [{ 
          model: Product, 
          through: {
            attributes: ['id', 'tag_id', 'product_id'],
          }
        }],
      }
    );
    if (!singleTag) {
      res.status(404).json({ error: "Tag with that id not found."});
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  if (!req.body.tag_name) {
    res.status(400).json({ error: "cannot create an empty tag"});
    return;
  }
  try {
    const createTag = await Tag.create(req.body);
    if (!createTag) {
      res.status(400).json({ error: "error creating tag" });
      return;
    };
    res.status(201).json({ success: "Tag created successfully"});
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  if (!req.body.tag_name) {
    res.status(400).json({ error: "cannot update tag with empty informaiton." });
    return;
  }
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ error: "Tag with that id does not exist." });
      return;
    };
    res.status(201).json({ success: `tag with id ${req.params.id} updated to ${req.body.tag_name}` })
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ error: "Tag with that id not found"});
      return;
    };
    res.status(200).json({ error: `Tag with id ${req.params.id} destroyed.`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
