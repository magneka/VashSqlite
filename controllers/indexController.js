var express = require('express');
var indexRouter = express.Router();

var router = function () {

    indexRouter.route('/').get(async function (req, res, next) {
        var model = {
          title: 'Welcome.', 
          content:'This is the customer application, created with Node.js, express and Vash razor compatible rendering engine'
        };
    
        res.render('index', model);
    });

    return indexRouter;
};
module.exports = router;