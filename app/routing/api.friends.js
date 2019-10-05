const db = require("../../models");
const errMsg = "There was an error with that query!";
const okMsg = "Success!";

module.exports = function(app) {
  // Create
  app.post("/api/friends", (req, res) => {
    const { name, scores, profileImage } = req.body;
    const newFriend = {
      name: name,
      dateCreated: Date.now(),
      scores: scores,
      profileImage: profileImage
    };

    db.Friend.create(newFriend)
      .then(dbFriend => {
        res.json({
          msg: okMsg,
          body: dbFriend
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          msg: errMsg,
          failed: 1,
          error: err
        });
      });
  });

  // Read
  app.get("/api/friends", (req, res) => {
    db.Friend.find({})
      .then(dbFriend => {
        res.json(dbFriend);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ msg: errMsg });
      });
  });
  
  app.get("/api/friends/:id", (req, res) => {
    db.Friend.findById(req.params.id)
      .then(dbFriend => {
        res.json(dbFriend);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ msg: errMsg });
      });
  });

  // Update
  app.put("/api/friends/:id", (req, res) => {
    const { name, scores } = req.body;

    db.Friend.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        scores: scores
      },
      {
        new: true,
        omitUndefined: true,
        runValidators: true
      }
    )
      .then(dbFriend => {
        res.json({
          msg: okMsg,
          failed: 0,
          body: dbFriend
        });
      })
      .catch(err => {
        res.status(400).json({
          msg: errMsg,
          failed: 1,
          body: err
        });
      });
  });

  // Delete
  app.delete("/api/friends/:id", (req, res) => {
    db.Friend.findByIdAndDelete(req.params.id)
      .then(dbFriend => {
        res.json({
          msg: okMsg,
          failed: 0,
          body: dbFriend
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          msg: errMsg,
          failed: 1,
          error: err
        });
      });
  });
};
