const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const jwt = require("jsonwebtoken");

// exports a register to middleware fn
// most of the function will write in controller file
exports.register = async (req, res, next) => {
  try {
    //get request from clients
    //VALIDATE DATA
    const { username, email, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "successfully!" });
  } catch (err) {
    //if has an error will throw to errorMiddleware:next(err)
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const targetUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!targetUser) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, targetUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }

    // const payload = {
    //   id: targetUser.id,
    // };

    // const accessToken = jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET_KEY || "secret",
    //   {
    //     expiresIn: process.env.JWT_EXPIRE || 1,
    //   }
    // );

    // res.status(200).json({ accessToken });

    // body para
    const payload = {
      // ข้อมูลที่ยืนยันตัวตนของ user เป็น id uuid ดีกว่าเพราะจะได่ไม่รู้ว่า token ของ username ไหน
      id: targetUser.id,
    };
    //method สร้าาง access TOekn
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "secret",
      {
        expiresIn: process.env.JWT_EXPIRE || "1",
      }
    );
    // console.log(accessToken)
    res.status(200).json({ msg: "success", accessToken });
    //server
    // แกะ token และนำ secret key เพื่อแกะ
  } catch (err) {
    console.log(err);
    next(err);
  }
};
