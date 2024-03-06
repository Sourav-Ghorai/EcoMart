import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Token Authorization for user.
export const requireSignIn = async(req, res, next) =>{
   try {
      //req.headers store the token and for decoding the token we need JWT_SECRET code which present in the .env file
      const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
      req.user = decode;
      next();
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error in User token authorization",
         error
      })
   }
}

//Token Authorization for admin
export const isAdmin = async(req, res, next) => {
   try {
      const user = await userModel.findById(req.user._id);
      if(user.role != 1){
         return res.status(401).send({
            success: false,
            message: "Unauthorized access",
         })
      }else{
         next();
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Error in Admin authorization",
         error
      })
   }
}