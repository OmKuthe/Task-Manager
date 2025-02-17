import express from "express"
import { Users } from "../model/userModel.js"
import { Tasks } from "../model/taskModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/authMiddleware.js";

const router =express.Router();
router.get('/', (request, response) => {
    return response.send("Hello Om");
});

router.post('/signup', async (request, response) => {
    try {
        const { username, email, password } = request.body;
        if (!username || !email || !password) {
            return response.status(400).send({
                message: "Please Provide All Fields"
            });
        }

        const userExist = await Users.findOne({ email });
        if (userExist) {
            return response.status(409).send({
                message: "User with given email already exists"
            });
        }
        const newUser = new Users({
            username,
            email,
            password
        });

        await newUser.save();

        return response.status(201).send({
            message: "New User Created Successfully",
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error in Signup");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                message: "Please Provide All Fields"
            });
        }

        const userExist = await Users.findOne({ email });
        if (!userExist) {
            return response.status(409).send({
                message: "User with given email does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return response.status(409).send({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            { userId: userExist._id, username: userExist.username }, // Include username in the JWT payload
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        return response.status(200).send({
            message: "Login Successful",
            token,
            username: userExist.username // Send username in the response
        });

    } catch (error) {
        console.log("Error in Login");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});


router.post('/tasks', authenticate, async (request, response) => {
    try {
        const { title, desc, category, duedate } = request.body;
        if (!title) {
            return response.status(400).send({
                message: "Please Provide Title"
            });
        }

        const newTask = new Tasks({
            user: request.user,
            title,
            desc,
            category,
            duedate
        });

        await newTask.save();

        return response.status(201).send({
            message: "New Task Created Successfully",
            newTask
        });

    } catch (error) {
        console.log("Error creating task");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/tasks', authenticate, async (request, response) => {
    try {
        const tasks = await Tasks.find({ user: request.user });
        return response.status(200).send(tasks);
    } catch (error) {
        console.log("Error in Getting tasks");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

router.get('/tasks/:id', authenticate, async (request, response) => {
    try {
        const { id } = request.params;
        const tasks = await Tasks.findById(id);
        return response.status(200).send(tasks);
    } catch (error) {
        console.log("Error in Getting task");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

router.patch('/tasks/:id',authenticate, async (req, res) => {
    try {
      const task = await Tasks.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/tasks/:id', authenticate, async (request, response) => {
    try {
        const { id } = request.params;
        console.log("Updating Task ID:", id);
        console.log("Request Body:", request.body);

        const { title, desc, status, category, duedate } = request.body;

        if (!title && !desc && !status && !category && !duedate) {
            return response.status(400).send({ message: "At least one field is required to update" });
        }

        const task = await Tasks.findOneAndUpdate(
            { _id: id, user: request.user }, // Ensure correct task and user
            { title, desc, status, category, duedate },
            { new: true }
        );

        if (!task) {
            return response.status(404).send({ message: "Task not found" });
        }

        return response.status(200).send({ message: "Task Updated Successfully", task });
    } catch (error) {
        console.log("Error in Editing task:", error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});


router.delete('/tasks/:id', authenticate, async (request, response) => {
    try {
        const { id } = request.params;
        const task = await Tasks.findOneAndDelete({ _id: id, user: request.user });
        if (!task) {
            return response.status(404).send({ message: "Task not found" });
        }
        return response.status(200).send({ message: "Task deleted Successfully" });
    } catch (error) {
        console.log("Error while deleting");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

export default router