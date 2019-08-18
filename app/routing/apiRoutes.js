const friends = require("../data/friends.js")

module.exports = function (app) {

    app.get("/api/friends", (req, res) => res.json(friends));

    app.post("/api/friends", (req, res) => {
        const newPost = req.body;
        res.json(newPost);
        friends.push(newPost);
    });
};