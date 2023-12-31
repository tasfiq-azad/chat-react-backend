const {register, login, setAvatar, getAllUsers} = require("../Controllers/userController");


const router= require("express").Router(); 


// login and register authentication 

router.post("/register",register)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);

module.exports=router;