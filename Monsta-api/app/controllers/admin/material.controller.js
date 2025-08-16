// controller connect with color.js
// file name depends on you whatever you want to give name
// here we create ll thes function that is mandatory

const materialModal = require("../../models/Materials");

// all the functions created 
exports.create=async(request,response)=>{
                                                // first of all we create object to pass insert query(run through model)
                                                // const data={
                                                //     name:request.body.name,
                                                //     Code:request.body.code,
                                                // }
                                            //what if i by name,code dont send value then into database a blank entry send
                                            // let do error handling(on not pass parameters,or on passing parameters,on not checking checkbox but value insertedt code and name value must not be inserted so (do validations)(withou) like name ,id,code etc.)
try{
                                        // 1st method(custom method)

                                        //   const data={
                                        //     name:request.body.name,
                                        //     // code:request.body.code,
                                        //     order:request.body.order,
                                        //      type:request.body.type,
                                        // } //if you want to pass data through variable then use this(call this variable in modelname) otherwise use request.body method
const insertData=new materialModal(request.body);//pass object
 await insertData.save()

// 2nd method
// const insertData =new colorModal(request.body);
//    await insertData.save()//insert query
//    if insert query run then go to then()

.then((result)=>{
                const output={
                    _status:true,
                    _message:"record inserted ",
                    _data:result,
                }
response.send(output);
})
.catch((error)=>{
    var errormessages=[];
    for(err in error.errors){
     errormessages.push(error.errors[err].message)

     }
    //  console.log(error);
    const output={
        _status:false,
        _message:"something went wrong",
        _data:null,
        _error_messages:errormessages,
    }
response.send(output);//for api error
})

}
catch(error){
            const output={
                _status:false,
                _message:"something went wrong",
                _data:null,
            }
response.send(output); //for syntax error
}
   

}//we also add image upload work in this  create api to call create api we use thunder client
exports.view=async(request,response)=>{

var condition={
    delete_at:null
} //total value available
var current_page=1;
if(request.body.page){
    current_page=request.body.page
}

var limit=2;
// var skip=0;bydefault
var skip=(current_page-1)*limit; //pagination

var totalRecords=await materialModal.find(condition).countDocuments();
var total_pages=Math.ceil(totalRecords/limit);//pagination value never come in float point number
await  materialModal.find(condition).skip(skip).limit(2)

.sort({
    order:'asc'
}).sort({
    _id:'desc'
})
    
.then((result)=>{
    if(result.length>0){
     const output={
    _status:true,
    _message:"record fetched ",
    _pagination:{
      current_page:current_page,
      total_pages:total_pages,
      total_records:totalRecords,
    },
    _data:result
}
response.send(output);
    }else{
const output={
    _status:false,
    _message:"no record fetch ",
    _data:result
}
response.send(output);
    }

})
.catch(()=>{
const output={
    _status:false,
    _message:"something went wrong",
    _data:null
}
response.send(output);

})   
}
exports.details=async(request,response)=>{
    //1st method using findone() function

//   await  colorModal.findOne({
    //id here
    // _id:request.body.id
//   })
//to gete single record thats why length condition dont apply if(result.length>0)
//  const insertData =new colorModal(data);//pass object
//    await insertData.save()//insert query
//    if insert query run then go to then()

//second method fndById()
await materialModal.findById(request.body.id)

.then((result)=>{
    if(result){
     const output={
    _status:true,
    _message:"record fetched ",
    _data:result
}
response.send(output);
    }else{
const output={
    _status:false,
    _message:"no record fetch ",
    _data:result
}
response.send(output);
    }

})
.catch(()=>{
const output={
    _status:false,
    _message:"something went wrong",
    _data:null
}
response.send(output);

})     
}
exports.update=async(request,response)=>{
 // first of all we create object to pass insert query(run through model)
    // const data={
    //     name:request.body.name,
    //     Code:request.body.code,
    // }

  await materialModal.updateOne({
_id:request.params.id

  },{
  $set:request.body
  }) 
  //remain image upload work done here
.then((result)=>{
const output={
    _status:true,
    _message:"record updated ",
    _data:result
}
response.send(output);
})
.catch(()=>{
const output={
    _status:false,
    _message:"something went wrong",
    _data:null
}
response.send(output);

})   
}
exports.changeStatus=async(request,response)=>{
await materialModal.updateMany({
_id:{
    $in:request.body.id
}

  },{
  $set:{
    status:{
        $not:"$status"
    }
  }
  }) 
  //remain image upload work done here
.then((result)=>{
const output={
    _status:true,
    _message:"change status successfully! ",
    _data:result
}
response.send(output);
})
.catch((error)=>{
const output={
    _status:false,
    _message:"something went wrong",
    _data:error
}
response.send(output);

})    
}
exports.destroy=async(request,response)=>{
await materialModal.updateMany({
_id:{
$in:request.body.id
}// use it in any api by changing modele name to pass multiple id for updation(if you want to seend value in array through postman then how?)so we use in body id[]

  },{
  $set:{
    delete_at:Date.now()
  }
  }) 
  //remain image upload work done here
.then((result)=>{
const output={
    _status:true,
    _message:"record deleted ",
    _data:result
}
response.send(output);
})
.catch(()=>{
const output={
    _status:false,
    _message:"something went wrong",
    _data:null
}
response.send(output);

})


//     await materialModal.deleteOne({
//       _id: request.body.id 
//     })

// .then((result)=>{
// //    no condition used here if(result){
//      const output={
//     _status:true,
//     _message:"record delete ",
//     _data:result
// }
// response.send(output);
// //     }else{
// // const output={
// //     _status:false,
// //     _message:"no record fetch ",
// //     _data:result
// // }

// // response.send(output);
// //     }

// })
// .catch(()=>{
// const output={
//     _status:false,
//     _message:"something went wrong",
//     _data:null
// }
// response.send(output);

// })   
}


//http://localhost:3001/api/admin/material/create

