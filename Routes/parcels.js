const express = require('express');

const router = express.Router();
const userAuth = require('../middleware/user-auth.js');
const parcelSchema = require('../Schemas/parcels.js');
const userSchema = require('../Schemas/users.js');
const {parcelValidation} = require('../validation.js');

router.get('/users/:userId',userAuth,async(req,res)=>{
    const findUser = await userSchema.findOne({_id:req.params.userId}).populate("users")
    const allParcels = await parcelSchema.find()
    try{
        res.status(200).json({
            allParcels,
            Total: allParcels.length,
            message: "These are your parcels"
        })
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.get('/:parcelId',userAuth,async(req,res)=>{
    const parcel = await parcelSchema.findById(req.params.parcelId)
    if (parcel){
        const parcelUser = await userSchema.findById(parcel.user._id)
        if (parcel.isParcelOwner(req.user._id)){
            const data = {
		        _id: parcel._id,
		        userId : parcelUser._id,
                userFirstName: parcelUser.firstName,
                userLastName: parcelUser.LastName,
                userEmail: parcelUser.mail,
                parcelItem: parcel.parcelItem,
                parcelWeight: parcel.parcelWeight,
                from: parcel.From,
                to: parcel.To,
                receiver: parcel.receiver,
                receiver_tel: parcel.receiver_tel,
                status: parcel.Status,
            }
            console.log(parcel)
            return res.status(200).json(data)
        }else {
            return res.status(401).json({
                message: `Not authorized to access this data`
            })
        }
    }else{
        return res.status(404).json({message: `No parcel with id: ${req.params.parcelId}`})
    }
})

router.post('/', userAuth,async(req,res)=>{
    const {error} = parcelValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const findUser = await userSchema.findById(req.user._id);

    const newParcel = await new parcelSchema({
        user: findUser._id,
        parcelItem : req.body.parcelItem,
        parcelWeight : req.body.parcelWeight,
        From : req.body.From,
        To : req.body.To,
        receiver: req.body.receiver,
        receiver_tel: req.body.receiver_tel
    })
    try{
        await newParcel.save();
        res.status(200).json({
        newParcel,
        message: "Parcel placed for delivery"
    });
    }catch(err){
        res.status(400).send(err);
    }

})


router.put('/:parelId/destination',async(req,res)=>{
    try{
    const findParcel = await parcelSchema.findOneAndUpdate({_id:req.params.parcelId},
        {$set:{
            From: req.body.From,
            To: req.body.To
        }},
        {returnNewDocument: true}
        )
      
            
                const updP = await findParcel.save()
                res.status(201).json({
                    updP,
                    message: "You have changed the destination"
            })
            
        }
        catch(err){
            res.status(400).send(err);
        }
    
    })

module.exports = router;