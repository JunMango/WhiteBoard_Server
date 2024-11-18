import express from 'express';
import axios from "axios";
import pkg from 'jsonwebtoken';
const { sign } = pkg; // 요거 있어야 함_ package 따로 선언

const authRouter = express.Router();

// authRouter('')
authRouter.post('/google', async (req, res) => {
    const { access_token } = req.body;
    if (access_token != null) {
        try {
            const userInfoResponse = await axios.get(
                `${process.env.AUTH_GOOGLE}${access_token}`,
                // `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
                { headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' } }
            );
            const user = userInfoResponse.data;
            const payload_access = { id: user.id, email: user.email, verify_email: user.verify_email, name: user.name };
            const payload_refresh = {id:user.id}
            const token = sign(payload_access, process.env.JWT_SECRET, { expiresIn: '1h' });
            // const refresh_token = sign(payload_refresh, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.status(200).json({
                token,
                // refresh_token,
                redirectUrl: `/user/${user.id}`,
            });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No access_token' });
    }
});

export  default authRouter;
