const express = require("express");

const commentsRouter = require("./routes/comments-router");

const postsRouter = require("./routes/posts-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {});

server.use("/api/comments", commentsRouter);

server.use("/api/posts", postsRouter);

server.listen(4001, () => {
	console.log("\n*** Server Running on http://localhost:4001 ***\n");
});
