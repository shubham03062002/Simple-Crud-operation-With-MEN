import express from "express";
import UserModel from "../Models/userModel.js"
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error); // This helps with debugging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post('/add',async(req,res)=>{


    try {
        const {name,sirname,email,password} = req.body
    const adduser = new UserModel({name,sirname,email,password})
    await adduser.save()
    res.status(200).json({success:true,message:"New User Added Successfully"})
        
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    


})


router.put('/update/:id', async (req, res) => {
    try {
        const updateID = req.params.id;
        const { name, sirname, email, password } = req.body;

        console.log(`Updating user with ID: ${updateID}`);
        console.log(`New data:`, { name, sirname, email, password });

        const updateuser = await UserModel.findByIdAndUpdate(updateID, { name, sirname, email, password }, { new: true });

        if (!updateuser) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.status(200).json({ success: true, message: "User Updated Successfully", user: updateuser });
    } catch (error) {
        console.error('Error in update route:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.delete('/delete/:id',async(req,res)=>{
    try {
        const userId = req.params.id
        const deleteduser = await UserModel.findByIdAndDelete(userId)
        if(!userId){
            return res.status(404).json({success:false,message:"USer not found"})
        }
        res.send({success:true,message:"User Deleted Successfully ...",deleteduser}).status(200)
        
    } catch (error) {
        console.error( error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
    
})

export default router;


