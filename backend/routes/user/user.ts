import { Router, Request, Response } from "express";
import {
  CheckIfUserPresent,
  generateSecurityCode,
  sendEmailToUser,
  userSignupForminputValidation,
} from "./middlewares/user-middlewares";
import { Users } from "../../db/db";

export const userRoute: Router = Router();

// Signup Route
userRoute.get("/signup", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const emailStatus = await sendEmailToUser("o210008@rguktong.ac.in", "sree");
  console.log(emailStatus.success);
  console.log(emailStatus.msg);
  // await Users.create({
  //   Username: username,
  //   Password: password,
  //   Email: email,
  // });
  res.status(201).json({ message: `Account created!` });
});
