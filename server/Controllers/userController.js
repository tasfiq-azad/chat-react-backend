
const User=require("../model/userModel")
const bcrypt=require("bcrypt");


// register authentication :

const register= async(req,res,next)=>{
try {
    const {name,email,password}= req.body;
    const nameCheck= await User.findOne({name});
    if(nameCheck){
        return res.json({msg:"already exist",status:false})
    }
    const emailCheck=await User.findOne({email});
    if(emailCheck){
     return res.json({msg:"already exist",status:false})
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        email,
        name,
        password:hashedPassword,
    })
    delete user.password;
    return res.json({status:true,user});
} catch (error) {
     next(error);
}
}

// login authentication:

const login= async(req,res,next)=>{
    try {
        const {name,password}= req.body;
        const user= await User.findOne({name});
        if(!user){
            return res.json({msg:"Incorrect username or password",status:false})
        }
       const isPasswordValid= await bcrypt.compare(password,user.password) // return boolean
        
       if(!isPasswordValid){
return res.json({msg:"Incorrect username or password",status:false})
       }
       
        delete user.password;
        return res.json({status:true,user});
    } catch (error) {
         next(error);
    }
    }


    const setAvatar=async(req,res,next)=>{
        try {

            const userId=req.params.id;
            const avatarImage=req.body.image;
            const userData=await User.findByIdAndUpdate(userId,{
                isAvatarImageSet:true,
                avatarImage,
            })
            
            return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
        } catch (error) {
            next(error)
        }

    }

    const getAllUsers=async(req,res,next)=>{
        try {
            const users=await User.find({_id:{$ne:req.params.id}}).select([
                "email","name","avatarImage","_id",
            ])
            res.json(users);
            
        } catch (error) {
           next(error)  
        } 

    }

module.exports={register,login,setAvatar,getAllUsers};