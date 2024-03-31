import Users from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { signInValidation, signUpValidation } from "../validations/auth.js";
import dotenv from "dotenv"
dotenv.config()
export const signUp = async (req, res) => {
    try {
        // Validate dữ liệu
        const { error } = signUpValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        // Kiểm tra email đã tồn tại chưa
        const emaillUser = await Users.findOne({ email: req.body.email });
        if (emaillUser) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }
        // Mã hóa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        // Khởi tạo user
        const user = await Users.create({
            ...req.body,
            password: hashedPassword
        });
        // Thông báo cho người dùng
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng ký thành công",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const signIn = async (req, res) => {
    try {
        // Validate dữ liệu
        const { error } = signInValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        // Kiểm tra email|username đã tồn tại chưa
        // const emailcheck = await Users.findOne({ email: req.body.email });
        // if (!emailcheck) {
        //     return res.status(400).json({
        //         message: "Tài khoản Email không tồn tại"
        //     });
        // }
        const Username = await Users.findOne({ username: req.body.username });
        if (!Username) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại"
            });
        }        
        // Kiểm tra pass
        const Passwordcheck = await bcryptjs.compare(req.body.password, Username.password);
        if (!Passwordcheck) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác"
            });
        }
        // Khởi tạo Token
        const accessToken = jwt.sign({ _id: Username._id }, process.env.SECRET_CODE);
        // Thông báo 
        Username.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            data: Username,
            accessToken: accessToken
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}