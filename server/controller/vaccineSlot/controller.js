const VaccineSlotsCollection = require('../../models/vaccineSlots/vaccineSlotModel');

const VaccineController = {

    addSlots: async (req,res)=>{

        if (!req.body) {
            return res.status(400).json({success:false, message: "Provide All Data !! " });
        }

        const slot = new VaccineSlotsCollection({
            date: req.body.date,
            users : req.body.users
        });

        slot.save(slot).then(data => {
            return res.status(200).json({success:true, data:data });
        }).catch(err => {
            return res.status(500).json({success:false ,message: err.message || "Error During Creation ......"});
        });
    },
    find: async (req, res) => {
        VaccineSlotsCollection.find().then(slot => {
                return res.status(200).json({ success: true, message: "All slot Data", data: slot });
            }).catch(err =>{
               return res.status(500).json({success:false, message:err.message || "Error During Searching.."});
            });
    }
}

module.exports = VaccineController;