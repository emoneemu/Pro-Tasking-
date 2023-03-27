const User = require('../model/user');
const bcrypt = require('bcryptjs');

exports.createAuser = async (req,res)=>{
    try{
        //console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password,8);
    const user = new User(req.body);
    console.log(user);
    await user.save();

    return res.status(201).json({success:true,user:user});
    }
    catch(e){
        return res.status(400).json({success:false, message:e.message});
    }
};

exports.getALLUsers = async(req,res)=>{

    const user = await User.find();
    return res.json({success:true,user:user});

};

exports.getAUser = async(req,res)=>{

    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'user not found!',
        });
    }
    return res.json({success:true,user:user});

};

exports.updateUserInfo = async (req,res)=>{
    try{
        const user= await User.findById(req.params.id);

        const keys = Object.keys(req.body);

        for(let key of keys)
        {
            user[key]=req.body[key];
        }
        await user.save();
        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found!',
            });
        }
        return res.status(200).json({success:true,user:user});
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message: e.message,
        });
    }
};

exports.deleteAUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:'user not found!',
        });
    }
    return res.json({success:true,user:user});
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message,
        });
    }
};

exports.login = async (req,res)=>{
    try{
        const{email,password} = req.body;
    const user = await User.findByCredentials(email,password);

    return res.status(200).json({
        success:true,
        user,
    })
    }
    catch(e){
        return res.status(401).json({
            success:false,
            message: e.message
        })
    }
    
};