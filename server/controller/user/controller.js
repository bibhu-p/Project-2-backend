var UsersCollection = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsersController = {

    register: async (req, res) => {

        if (!req.body) {
            return res.status(400).send({ message: "Provide All Data !! " });
        }
        const saltRounds = 12;
        const password = req.body.password;

        const hash = bcrypt.hashSync(password, saltRounds);
        // console.log(hash);

        const userType = req.body.userType;

        if(userType === 'admin'){
            const admin = new UsersCollection({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                userType:'admin'
            })
    
            admin.save(admin).then(data => {
                return res.send(data);
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Error During Creation ......"
                });
            });
        }
        else{
            const user = new UsersCollection({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                address: req.body.address,
                age: req.body.age,
                adhaar: req.body.adhaar,
                phone: req.body.phone,
                userType : req.body.userType,
            });
    
            user.save(user).then(data => {
                return res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error During Creation ......"
                });
            });
        }
    },
    login: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: " Enter all the fields! " });
            
        }
        await  UsersCollection.find({ email: req.body.email }).then(user => {
            if (user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password).then((result) => {
                    if (result) {
                        var authToken = jwt.sign({ id: user[0]._id }, process.env.PRIVATEKEY);

                        return res.status(200).json({success:true, data:user[0],token:authToken });
                    } else {
                        return res.status(500).send({ message: "Invalid Password!" });
                    }
                });
            }
            else{
                return res.status(404).send({ message: "User Not Found !" });
            }
        }).catch(err => {
            return res.status(404).send({ message: err.message || "Data not found" });
        });
    },
    find: async (req, res) => {
        UsersCollection.find({userType:'user'}).then(user => {
                return res.status(200).json({ success: true, message: "All user Data", data: user });
            }).catch(err =>{
               return res.status(500).json({success:false, message:err.message || "Error During Searching.."});
            });
    },
    findById: async (req, res) => {
        if (!req.params.id) {
            return res.status(404).send({ message: "Provide ID!! " });
        }
        else {
            const id = req.params.id;
            UsersCollection.findById(id).then(user => {
                    return res.status(200).json({success : true, message:'User Info',data:user});
                }).catch(err =>{
                    return res.status(500).json({success:false, message: err.message || 'Something Went Wrong.!' });
            });
        }
    },
    update: async (req, res) => {
        if (!req.body) {
            return res.status(400).send({ message: "Update data can't be empty..." });
        }
        const body = req.body;
        const id = req.params.id;
        let updateData = await UsersCollection.findByIdAndUpdate(id, body, { userFindAndModify: false })
        if (updateData) {
            return res.status(200).json({ success: true, message: "Data updated", data: updateData });
        }else{
            return res.status(500).json({success:false, message: err.message || 'Something Went Wrong.!' });
        }
    },

}

module.exports = UsersController;