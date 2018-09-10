

var friendsData = require("../data/friends.js").friends;


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var bestFriend
    var minDiff = 999
    for(var i = 0; i < friendsData.length;i++){
        var diff = 0
        for(var j = 0; j < req.body.scores.length; j++){
            diff += Math.abs(+friendsData[i].scores[j] - +req.body.scores[j])
            
        }
        if(minDiff > diff){
            minDiff = diff
            bestFriend = friendsData[i]
        }
    }
    friendsData.push(req.body)
    return res.json(bestFriend)
  });

};
