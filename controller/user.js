const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../model/User');
module.exports = {

    getUser: async (req, res, next) => {
        const { user_id } = req.params;
        console.log(user_id);
        try {
            await User.sync();
            try {
                const result = await User.findOne({ where: { user_id } });
                return res.status(200).json({ message: 'get user data', data: result });
            } catch (err) {
                console.log('can\'t get user data', err);
                return res.status(500).json({ message: 'can\'t get user data' });
            }
        } catch (err) {
            console.log('User table sync failed!', err);
            res.redirect('/');
        }

        // get cookie from page 
        // check user information
        // query user information from database 
        // get all user data 
        // respond json to front

    },

    update: async (req, res, next) => {
        const { user_id } = req.params;
        const { user_username, user_phone, user_address } = req.body;
        
        try {
            await User.sync();
            try {
                await User.update({ user_username, user_phone, user_address }, { where: { user_id } });
                return res.status(200).json({ message: `${user_id} update success!` })
            } catch (err) {
                console.log('update failed!', err);
                res.redirect('/');
            }
        } catch (err) {
            console.log('User table sync failed!', err);
            res.redirect('/');
        }

        // take cookie then check user information   
        // query user from database
        // if exist then take request body data into database
        // redirect to user page

    },

    login: async (req, res, next) => {
        const { user_email, user_password } = req.body;
        try {
            await User.sync();

            // query user by email 
            const result = await User.findAll({ where: { user_email } });

            // check email is exist if not respond error
            if (result.length < 1) return res.status(500).json({ message: 'email not exist' });

            // if exist then create session and respond to cookie 
            try {
                await bcrypt.compare(user_password, result[0].user_password);
                // create token or session 
                // set session or token into cookie
                // redirect to index
                console.log(`${result[0].user_email} is login`);
                console.log(req.sessionID);
                res.redirect('/');
            } catch (err) {
                console.log('login error ', err);
                return res.status(500).json({ message: 'wrong password!'});
            }
        } catch (err) {
            console.log('User table sync failed!', err);
            res.redirect('/login');
        }
    },

    signup: async (req, res, next) => {
        const { user_email, user_password, confirm } = req.body;

        // confirm 2 password is match 
        if (confirm !== user_password) return res.status(401).json({ message: 'password not match' });
        try {
            await User.sync();
            try {
                // chekc database email is exist or not
                let result = await User.findAll({ where: { user_email } });

                // if exist respond error
                // if not insert request body data into database, but passsord need encrypt
                if (result.length >= 1) return res.status(400).json({ message: 'email is exist' });
                const hash = await bcrypt.hash(user_password, config.salt);
                await User.create({ user_email, user_password: hash });
                console.log(`user 【${user_email}】 been created!`);

                // redirect to login page
                return res.redirect('login');
            } catch (err) {
                console.log('signup error ', err);
                return res.status(500).json({ message: 'signup failed!'});
            }
        } catch (err) {
            console.log('User table sync failed!', err);
            return res.redirect('/signup');
        }
    },

    logout: (req, res, next) => {
        req.session.destroy((err) => {
            if(err) console.log('session error:  ', err);
            else console.log('session destroy!');
        })
        return res.redirect('/');
        // clear cookie on this web 
        // redirect to index        
    },
}