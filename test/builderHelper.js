
module.exports = {
    buildUser: (id, firstName = "super", username = "test", email= "test@gmail.com", isActive = true) => {
        return {
            _id: id,
            firstName: firstName,
            lastName: "bos",
            username: username,
            email: email,
            address: "di hati cosmart",
            isActive: isActive,
            infoLogin: {
                hash: "asdas",
                salt: "asda",
                iterations: 8912
            },
            updatedAt: "2022-12-04T19:53:20.387Z",
            gender: "Man"
        }
    }
    
};
