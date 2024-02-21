const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = AsyncHandler(async (req, res) => {
    // get the data from the frontend
    const { f_name, l_name, email, password, dob, gender } = req.body;
    // check if user adds all the fields
    if (!f_name || !l_name || !email || !password || !dob || !gender) {
        res.status(400);
        throw new Error('Please enter all the fields')
    }



    const createdUser = await User.create({
        f_name, l_name, email, password, dob, gender 
    })
    res.send(createdUser)
}

)

module.exports = {
    registerUser
}

