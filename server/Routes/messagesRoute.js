const { addMessage, getAllMessage } = require("../Controllers/messagesController");



const router= require("express").Router(); 


// login and register authentication 

router.post("/addMsg",addMessage)
router.post("/getmsg",getAllMessage)
module.exports=router;