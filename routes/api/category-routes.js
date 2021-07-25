const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "category_name"],
    },
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console, log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "price", "product_name", "stock"],
    },
  })
    .then((categoryDb) => res.json(categoryDb))
    .catch((err) => {
      console, log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryDb) => res.json(categoryDb))
    .catch((err) => {
      console, log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((categoryDb) => {
    if (!categoryDb) {
      res.status(404).json({ message: "No category found" });
      return;
    }
    res.json(categoryDb);
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((categoryDb) => {
    if (!categoryDb) {
      res.status(404).json({ message: "No category found" });
      return;
    }
    res.json(categoryDb);
  });
});

module.exports = router;
