var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var data = require("../data/friends.js");



module.exports = (function () {
    var apiRouter = express.Router();
    apiRouter.use(express.static(path.join(__dirname, "../public")));
    apiRouter.use(bodyParser.urlencoded({ extended: true }));
    apiRouter.use(bodyParser.json());
    apiRouter.get('/friends', function (req, res) {
        res.json(data.friendsData);
    })

    apiRouter.post('/friends', function (req, res) {
        const body = req.body;
        const user = body.user;
        const thisUser = {
            name: user.name,
            photo: user.photo,
            scores: []
        }
        const tempArray = [];
        // Below logic was created in case the user didn't fill out all the questions, but upon checking, looks like the
        //original app required all
        for (let i = 10; i > 0; i--) {
            let question = 'q' + i;
            if (user[question] !== undefined) {
                tempArray.push(user[question]);
            }
        }
        for (let a = 0; a < tempArray.length; a++) {
            let testNum = parseInt(tempArray[a]);
            if (testNum % 1 === 0) {
                thisUser.scores.push(testNum);
            } else {
                let extractedNum = tempArray[a].splice(0, 1);
                thisUser.scores.push(extractedNum);
            }
        }
        // Because of the push, the array is out of order, got to reverse in order to line it up.
        thisUser.scores.reverse();
        data.friendsData.push(thisUser);
        let count = 0;
        let bestMatch;
        let total = 0;
        for (let i = 0; i < data.friendsData.length; i++) {
            // Contains value of user to compare with previous person in loop.
            let result = 0;

            // Checks to make sure that you don't get matched with yourself :)
            if (thisUser.name !== data.friendsData[i].name) {
                for (let a = 0; a < data.friendsData[i].scores.length; a++) {
                    let compare = (thisUser.scores[a] - data.friendsData[i].scores[a]);
                    // Checks for negative values
                    if (compare < 0) {
                        compare = (compare * -1);
                    }
                    // Calculates total points for current person in loop
                    result += compare;
                }
                // Check to see if this is the first person or not, if it is, assign to variables
                if (count === 0) {
                    total = result;
                    bestMatch = data.friendsData[i];
                    count++;
                    // Below else statement will assign the next person as a match if values are the same. So, the 
                    // one that's further down the list will get picked. This is a problem :/ with the app as a whole.
                    // I think that we could return all possible matches that have the same points??
                } else if (result <= total) {
                    total = result;
                    bestMatch = data.friendsData[i];
                }
            }

        }
        res.json(bestMatch)
    })
    return apiRouter;
})();

