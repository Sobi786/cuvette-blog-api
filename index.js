const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded())
//app.use() -> connecting middleware to server


// creating schema

const User = mongoose.model('User', { //users
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number
})



// app.get('/users', (req, res) => {
//     const USERS = [{
//         firstName: 'John',
//         lastname: 'doe',
//         email: 'sohebsheikh02@gmail.com',
//         phno: 8669395614
//     },
//     {
//         firstName: 'soheb',
//         lastname: 'sheikh',
//         email: 'sohelsheikh02@gmail.com',
//         phno: 8669395614
//     }]
//     res.json(USERS)
// })


app.get('/api', (req,res)=>{
    res.send('our first render')
})

//READ: GET /users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'SUCCESS',
            data: users
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'something went wrong'
        })
    }

});



//CREATE: POST /users
app.post('/users', async (req, res) => {
    try {

        console.log(req.body)
        const { firstName, lastName, email, phoneNumber } = req.body;

       await User.create(
        {
            firstName:'SRK',
            lastName:'SHEIKH',
            email:'SRKSHEIKH@gmail.com',
            phoneNumber: 9545155560
        });

        res.json({
            status: 'SUCCESS',
            message: 'user created successfully'
        });

        

    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'something went wrong'
        })
    }

});




// UPDATE: PATCH /users/:id
app.patch('/users/:id', async (req, res) => {
    try {

        const { id } = req.params;

        console.log(req.body)
        const { firstName, lastName, email, phoneNumber } = req.body;

        await User.create({ firstName, lastName, email, phoneNumber })
        //{
        //     firstName: 'priya',
        //     lastName: 'rai',
        //     email: 'priysa@gmail.com',
        //     phone: 8669395614
        // }

        res.json({
            status: 'SUCCESS',
            message: 'user created successfully'
        });
    } catch (error) {
        res.json({
            status: 'FAILED',
            message: 'something went wrong'
        })
    }
});
// DELETE: DELETE /users/:id
// app.delete('/users/:id', async (req, res) => {
//     try {

//         const {id} = req.params;

//         console.log(req.body)
//         const {firstName,lastName,email,phoneNumber} = req.body;

//          await User.findByIdAndDelete(id)
//{
//     firstName: 'priya',
//     lastName: 'rai',
//     email: 'priysa@gmail.com',
//     phone: 8669395614
// }

//         res.json({
//             status: 'SUCCESS',
//             message: 'user deletedted successfully'
//         });
//     } catch (error) {
//         res.json({
//             status: 'FAILED',
//             message: 'something went wrong'
//         })
//     }

// });

//connected with mongodb    
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Server is running ');
        })

        .catch((error) => {
            console.error((error));
        });

});



