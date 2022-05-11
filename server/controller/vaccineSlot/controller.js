const VaccineSlotsCollection = require('../../models/vaccineSlots/vaccineSlotModel');

const VaccineController = {

    create: async (req, res) => {

        if (!req.body) {
            return res.status(400).json({ success: false, message: "Provide All Data !! " });
        }
        const slot = new VaccineSlotsCollection({
            date: req.body.date,
            user: req.body.user
        });
        slot.save(slot).then(data => {
            return res.status(200).json({ success: true, data: data });
        }).catch(err => {
            return res.status(500).json({ success: false, message: err.message || "Error During Creation ......" });
        });

    },
    find: async (req, res) => {
        try{
            const slotData = await VaccineSlotsCollection.find({ date: req.params.id });
            if(slotData.length > 0){
                return res.status(200).json({ success: true, message: "All slot Data", data: slotData[0] });
            }
            else{
                return res.status(204).json({ success: false, message:"No Data Found.!", data: null });
            }
        }catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
        
    },
    update :async (req, res)=>{
        const body = req.body.user;
        const date = req.params.id;
        const limit = 5;
        if (!body && !id) {
            return res.status(400).json({ success: false, message: "Update data can't be empty..." });
        }
        try {
            const oldData = await VaccineSlotsCollection.find({date:date});
            if(oldData[0].user.length < limit){
                const updateData = await VaccineSlotsCollection.updateOne({
                    _id: oldData[0]._id
                    },{
                        $push:{
                            user:body}})
                    if (updateData) {
                        return res.status(200).json({ success: true, message: "Data updated", data: updateData });
                    }
            }else{
                return res.status(400).json({success:false, message:'Maximum number reached.!'})
            }
            
        }catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    },
    findUserSlot :async (req,res)=>{
        const userId = req.params.userId;
        const singleSlot = await VaccineSlotsCollection.find({user:userId})
        if(singleSlot.length > 0){
            return res.status(200).json({success:true, message:'User has been booked.',data:singleSlot[0]})
        }
        return res.status(204).json({ success: false, message:"User is not booked any slot." });
        
    }
}

module.exports = VaccineController;