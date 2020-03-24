'use strict';
var mongoose = require('mongoose');
var ClientModal = require('./Clients.Model');
    var controller = {}



    
    controller.get_all_ClientModals = function(req,res){
        ClientModal.find({},function(err,cm){
            console.log('All Staff are Successfully Retreived')
            if(err)
            res.send(err);
            res.json(cm);
        });
    }
    controller.create_a_ClientModal = function(req,res){
        var new_ClientModal = new ClientModal(req.body);
        new_ClientModal.save(function(err,cm){
            console.log('Successfully Inserted');
            if (err)
            res.send (err);
            res.json(cm);
        });   
    }
    controller.getByUserId = function (req, res) {
            console.log('i a working');
            ClientModal.find( { Id:req.params.id},function (err, cm){
            if (err)
                res.send(err);
            res.json(cm);
        });
    };
    controller.read_a_ClientModal = function(req,res){
        ClientModal.findById(req.params.id, function(err,cm){
            console.log('Successfully Retreived')
            if(err)
            res.send(err);
            var ClientArray = [];
            CMArray.push(cm)
        res.json(ClientArray);
        });
    }
    controller.update_a_ClientModal = function(req,res){
        ClientModal.findOneAndUpdate({_id: req.params.id},req.body,{new : true},function(err,cm){
        console.log('successfully updated')
        if(err)
        res.send(err);
        res.json(cm);
    });
    }
    controller.Delete_a_ClientModal = function (req, res) {
        ClientModal.remove({
            _id: req.params.id
        }, function (err, cm) {
            if (err)
                res.send(err);
            res.json({ message: 'item Model successfully deleted' });
            res.json(cm);
        });
    };
    

    module.exports = controller; 