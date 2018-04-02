var express = require('express');
var customerRouter = express.Router();
var customerRepoAsync = require('../datalayer/customerRepository');

var router = function () {

    customerRouter.route('/').get(async function (req, res, next) {
        try {
            console.log('List all customers')
            var model = await customerRepoAsync.getAllCustomers();
            res.render('customerlist', model);  
        } catch (err) {
            console.log(err);
            res.render('error', {message: err} ); 
        }
    });

    customerRouter.route('/new/').get(function (req, res, next) {
        var model = {
            id: '',
            firstname: '', 
            lastname:''
        };
        res.render('editform', model);
    });

    customerRouter.route('/edit/:id').get(async function (req, res, next) {
        try {
            if (req.params.id == null || req.params.id.length === 0)
                throw ("No Id spesifided");
            
            console.log("retrieve customer: " + req.params.id);
            var model = await customerRepoAsync.getCustomerById(req.params.id);
            res.render('editform', model)
        } catch (error) {
            console.log(err);
            res.render('error', {message: err} ); 
        }
    });
        
    customerRouter.route('/edit').post(async function (req, res, next) {
        try {
            if (req.body.id == null || req.body.id.length === 0) {
                var model = await customerRepoAsync.createCustomer(req.body);   
                res.redirect('/customers')
            }
            else 
            {
                var model = await customerRepoAsync.updateCustomer(req.body);  
                res.redirect('/customers')  
            } 
        } catch (error) {
            console.log(err);
            res.render('error', {message: err} ); 
        }   
    });
    
    customerRouter.route('/delete/:id').get(async function (req, res, next) {
        try {
            if (req.params.id == null || req.params.id.length === 0)
                throw ("No Id spesifided");
            
            console.log("retrieve customer to be deleted: " + req.params.id);
            var model = await customerRepoAsync.getCustomerById(req.params.id);
            res.render("customerDelete", model)
        } catch (err) {
            console.log(err);
            res.render('error', {message: err} ); 
        }
    });
    
    customerRouter.route('/delete').post(async function (req, res, next) {
        try { 
            if (req.body.id == null || req.body.id.length === 0)
                throw "No id provided.";
                
            var result = await customerRepoAsync.deleteCustomer(req.body);
            res.redirect('/customers'); 
        }
        catch(err) {
            console.log(err);
            res.render('error', {message: err} );
        }   
    });

    return customerRouter;
};
module.exports = router;