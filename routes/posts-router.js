const router = require("express").Router();

const Posts = require("../data/db");

router.post("/", (req, res) => {
	const postInfo = req.body;
	if (!postInfo.title || !postInfo.contents) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		Posts.insert(postInfo)
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
		Posts.insert(req.body)
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

router.get("/", (req, res) => {
	Posts.find()
		.then(post => res.status(200).json(post))
		.catch(error =>
			res.status(500).json({
				error: "The posts information could not be retrieved."
			})
		);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	if (!id) {
		res
			.status(404)
			.json({ message: "The post with the specified ID does not exist." });
	} else {
		Posts.findById(id)
			.then(post => res.status(200).json(post))
			.catch(error =>
				res.status(500).json({
					error: "The post information could not be retrieved"
				})
			);
	}
});

router.get("/:id/comments", (req, res) => {
	const id = req.params.id;
	if (!id) {
		res
			.status(404)
			.json({ message: "The comments with the specified ID does not exist." });
	} else {
		Posts.findById(id)
			.then(post => {
				res.status(200).json(post);
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					error: "The comments information could not be retrieved"
				});
			});
	}
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	Posts.remove(id)
		.then(post => {
			if (!id) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			} else {
				res.status(200).json({ message: "The post has been destroyed" });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ error: "The post could not be removed" });
		});
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	if (!id) {
		res
			.status(404)
			.json({ message: "The post with the specified ID does not exist." });
	} else if (!changes.title || !changes.contents) {
		res.status(400).json({
			errorMessage: "Please provide title and contents for the post."
		});
	} else {
		Posts.update(id, changes)
			.then(post => {
				res.status(200).json(post);
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					error: "The post information could not be modified."
				});
			});
	}
});

module.exports = router;
