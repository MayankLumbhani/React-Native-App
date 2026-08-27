import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {

    const user =await registerUser(req.body);

    res.status(201).json({
        success : true,
        data : user,
    });
    
};

export const login = async ( req, res ) => {

    const {user, token} = await loginUser(req.body);

    res.status(200).json({
        success : true,
        data : {
            user,
            token
        },
    });
    
};