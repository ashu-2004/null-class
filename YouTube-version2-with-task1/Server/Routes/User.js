import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechaneldata,getallchanels } from "../Controllers/channel.js";
import { updatePoints, getUserPoints } from "../Controllers/User.js"; // Import user functions

const routes=express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updatechaneldata)
routes.get('/getallchannel',getallchanels)
routes.post('/updatePoints', updatePoints); // Route to update points
routes.get('/getUserPoints/:userId', getUserPoints); // Route to get points

export default routes;