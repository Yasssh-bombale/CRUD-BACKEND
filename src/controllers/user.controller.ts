import { Request, Response } from "express";
import User from "../models/user.model";
import nodeMailer from "nodemailer";

// create user
export const createUser = async (req: Request, res: Response) => {
  const { userName, phoneNumber, email, hobbies } = req.body;

  if (!userName || !phoneNumber || !email || !hobbies) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.create({
      userName,
      phoneNumber,
      email,
      hobbies,
    });

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    console.log(`ERROR:IN CREATE-USER-CONTROLLER,${error}`);
    return res.status(500).json("ERROR:IN CREATE-USER-CONTROLLER");
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { userName, phoneNumber, email, hobbies } = req.body;
  const { userId } = req.params;

  if (!userName && !phoneNumber && !email && !hobbies) {
    return res
      .status(400)
      .json({ message: "No information provided to update" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          userName: userName,
          phoneNumber: phoneNumber,
          email: email,
          hobbies: hobbies,
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({ message: "User updated", user });
  } catch (error) {
    console.log(`ERROR:IN UPDATE-USER-CONTROLLER,${error}`);
    return res.status(500).json("ERROR:IN UPDATE-USER-CONTROLLER");
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    return res.status(201).json({ message: "User deleted", user });
  } catch (error) {
    console.log(`ERROR:IN DELETE-USER-CONTROLLER,${error}`);
    return res.status(500).json("ERROR:IN DELETE-USER-CONTROLLER");
  }
};

// fetch all users;
export const getALLUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.status(201).json({ message: "fetch successfull", users });
  } catch (error) {
    console.log(`ERROR:IN FETCH-USER-CONTROLLER,${error}`);
    return res.status(500).json("ERROR:IN FETCH-USER-CONTROLLER");
  }
};

//send email;

// const demoArray = ["yash", "bombale"];

export const sendEmail = async (req: Request, res: Response) => {
  const { filteredUsersData } = req.body;

  console.log(filteredUsersData);

  if (!filteredUsersData) {
    return res.status(400).json("selected user is needed");
  }

  const html = `<h1>Your selected users are</h1><ul>${filteredUsersData
    .map(
      (user: any, index: number) =>
        `<li>${index + 1} Username is ${user.userName},<br/> Email is ${
          user.email
        } <br/> phoneNumber is ${user.phoneNumber} <br/> Hobbies is ${
          user.hobbies
        } </li>`
    )
    .join("")}</ul>`;

  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    //info@redpositive.in
    const info = await transporter.sendMail({
      from: '"Yash Bombale" <yashbombale@gmail.com>', // sender address
      to: "roybombale@gmail.com", // list of receivers
      subject: "To send selected users", // Subject line
      text: "Hey there", // plain text body
      html: html, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    res.json(info);
  } catch (error) {
    console.log(`ERROR:IN SEND-EMAIL-CONTROLLER,${error}`);
    return res.status(500).json("ERROR:IN SEND-EMAIL-CONTROLLER");
  }
};
