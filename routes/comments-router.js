const router = require("express").Router();

const comments = require("../data/seeds/02-comments");

module.exports = router;

router.post("/:id/comments", (req, res) => {
	const id = req.params.id;

	if (!id) {
		res
			.status(404)
			.json({ message: "The post with the specified ID does not exist." });
	} else if (!req.body.text) {
		res
			.status(400)
			.json({ errorMessage: "Please provide text for the comment." });
	} else {
		comments
			.insert(req.body)
			.then(post => {
				res.status(201).json(post);
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					error: "There was an error while saving the comment to the database"
				});
			});
	}
});

router.get("/:id/comments", (req, res) => {
	const id = req.params.id;
	comments
		.findById(id)
		.then(getById => {
			if (getById) {
				res.json(getById);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist."
				});
			}
		})
		.catch(error =>
			res
				.status(500)
				.json({ error: "The comments information could not be retrieved." })
		);
});
