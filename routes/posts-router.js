const router = require("express").Router();

const posts = require("../data/seeds/01-posts");

module.exports = router;

router.post("/", (req, res) => {
	const postInfo = req.body;
	if (!postInfo.title || !postInfo.contents) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		posts
			.insert(postData)
			.then(post => {
				res.status(201).json(post);
			})
			.catch(error => {
				res.status(500).json({
					error: "There was an error while saving the post to the database"
				});
			});
	}
});

router.get("/", (req, res) => {
	posts
		.find()
		.then(post => res.json(post))
		.catch(error =>
			res.status(500).json({
				error: "The posts information could not be retrieved."
			})
		);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	posts
		.findById(id)
		.then(postsById => {
			if (postsById) {
				res.json(postsById);
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist."
				});
			}
		})
		.catch(error =>
			res
				.status(500)
				.json({ error: "The post information could not be retrieved." })
		);
});
