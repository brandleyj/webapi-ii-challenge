const router = require("express").Router();

const comments = require("../data/seeds/02-comments");

module.exports = router;

router.post("/:id/comments", (req, res) => {
	const comment = req.body;

	if (!comment.postID) {
		res
			.status(404)
			.json({ message: "The post with the specified ID does not exist." });
	} else if (!comment.text) {
		res
			.status(400)
			.json({ errorMessage: "Please provide text for the comment." });
	} else if (comment.postID && comment.text) {
		comments
			.insertComment(comment)
			.then(result => {
				res.status(201).json(result);
			})
			.catch(err => {
				res.status(500).json({
					err: "Could not insert comment. Check post structure & try again."
				});
			});
	}
});
