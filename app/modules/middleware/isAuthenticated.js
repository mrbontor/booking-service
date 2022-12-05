const { VerifyAccessToken } = require('../../libraries/encrypting/jwtLibs');
const ResponseHelper = require('../../helpers/response');
const { UserService } = require('../services');

const TOKEN_SECRET = process.env.APP_TOKEN_SECRET;
const UNAUTHORIZED = 401;
const UNPROCESSABLE_ENTITY = 422;
const COOKIE_REFRESH_TOKEN = 'RTOKEN';

const projection = ['username', 'firstName', 'lastName', 'email', 'isActive', 'token', 'isAdmin'];
const isSecure = process.env.ENV != 'development';

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader?.startsWith('Bearer ')) return ResponseHelper.customStatus(res, UNAUTHORIZED);

            const token = authHeader.split(' ')[1];

            const isTokenValid = await VerifyAccessToken(token, TOKEN_SECRET);
            // console.info(`[VERIFY][TOKEN][MIDDLEWARE] >>>>> ${JSON.stringify(isTokenValid)}`);
            if (!isTokenValid) {
                return ResponseHelper.customStatus(res, UNAUTHORIZED);
            }

            const user = await UserService.getUserBy(
                {
                    username: isTokenValid.data.username,
                },
                { projection: projection },
            );

            if (!user.isActive) {
                res.clearCookie(COOKIE_REFRESH_TOKEN, {
                    httpOnly: isSecure,
                    sameSite: 'None',
                    secure: isSecure,
                });
                return ResponseHelper.customStatusWithMessage(
                    res,
                    UNPROCESSABLE_ENTITY,
                    'Your account has been disactivated, please contact adminstrator if you think this is wrong!',
                );
            }

            console.info(`[VERIFY][USER][MIDDLEWARE] >>>>> ${JSON.stringify(user)}`);

            req.userContext = isTokenValid.data;
            next();
        } catch (err) {
            console.error(`[VERIFY][TOKEN][MIDDLEWARE] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.customStatus(res, UNAUTHORIZED);
        }
    },
};
