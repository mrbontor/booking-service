const { buildUser } = require('./builderHelper');
const {
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    DecodeJwtToken,
} = require('../app/libraries/encrypting/jwtLibs');

const { Encrypt, Decrypt, VerifyHashPassword } = require('../app/libraries/encrypting/AEAD');
const setJwtPayload = (data) => {
    return {
        userId: data._id,
        username: data.username,
        firstName: data.firstName,
        email: data.email,
        isActive: data.isActive,
        isAdmin: data.isAdmin
    };
};

const deviceId = 'pengenROG';

module.exports = {
    generateToken: async () => {
        let userData = buildUser();

        const payload = setJwtPayload(userData);

        const accessToken = await SignAccessToken(payload);
        const refreshToken = await SignRefreshToken(
            Encrypt({
                email: userData.email,
                loginId: "123",
            }),
        );
        
        return { accessToken, refreshToken, deviceId  };
    }
    
};
