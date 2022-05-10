const VaccineSlotsCollection = require('../../models/vaccineSlots/vaccineSlotModel');

const VaccineController = {

    addSlots: async (req, res) => {

        if (!req.body) {
            return res.status(400).json({ success: false, message: "Provide All Data !! " });
        }

        // let slotData = await VaccineSlotsCollection.find({ date: req.body.date });
        // // console.log(slotData);
        // if (slotData) {
        //     try {
        //         var oldUserData = slotData[0].user
        //         oldUserData.push(req.body.user);
        //         var user = {
        //             user:oldUserData
        //         }
        //         const updateData = await VaccineSlotsCollection.findByIdAndUpdate( slotData[0]._id,user,{ userFindAndModify: false })
        //         // console.log("try block","updateData")

        //         if (updateData) {
        //             return res.status(200).json({ success: true, message: "Slot Booked", data: updateData });
        //         }
        //     } catch (err) {
        //         return res.status(500).json({ success: false, message: err });
        //     }
        // } else {
            const slot = new VaccineSlotsCollection({
                date: req.body.date,
                user: req.body.user
            });

            slot.save(slot).then(data => {
                return res.status(200).json({ success: true, data: data });
            }).catch(err => {
                return res.status(500).json({ success: false, message: err.message || "Error During Creation ......" });
            });

        // }
    },
    find: async (req, res) => {
        VaccineSlotsCollection.find({ date: req.params.date }).then(slot => {
            return res.status(200).json({ success: true, message: "All slot Data", data: slot });
        }).catch(err => {
            return res.status(500).json({ success: false, message: err.message || "Error During Searching.." });
        });
    }
}

module.exports = VaccineController;