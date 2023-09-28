const prisma = require("../models/prisma");
exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    //VALIDATE columns
    const todo = await prisma.todo.create({
      data: {
        title,
        completed,
        dueDate,
        user: {
          connect: req.user,
        },
      },
    });
    //send response to server (return object that user just create new todo (todo))
    res.status(201).json({ message: "created", todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
        //req.uer.id : get from auth-controller
      },
    });
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};
