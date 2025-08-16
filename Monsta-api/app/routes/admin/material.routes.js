// for color modules of admin as many routes we create like:
// add,view,update,delete(single,multiple delete),details,change status(single,multiple ) these 6 api we have to create
// we connect this file with controller files here w create routs first

const express=require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/material.controller');
const router=express.Router();

// :6000/admin/api/category/add
module.exports=server=>{
    //call all url here for api(all the route of api creation done)

router.post('/create',create);
router.post('/view',view);
router.post('/details',details);
router.put('/update/:id',update);//reason behind taking put method in thesee three api is that we will update records in all of these using id
router.put('/change-status',changeStatus);
router.put('/delete',destroy);



server.use('/api/admin/material',router) //this is fixed url to concate above all the url
}


//proper url(http://localhost:6000/api/admin/color/create)