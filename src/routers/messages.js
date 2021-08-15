const { deCrypt, enCrypt } = require("../endenpt/store")
const { getFile, addUpdatedRecord } = require("../utilities/IPFS_functions")

const MessageRouter = require("express").Router()

MessageRouter.get("/", (req, res)=>{
    res.send(req.body)
})

MessageRouter.post('/new', async (req, res)=>{
    try{
        const {message, targetId, hashedKey, senderId} = req.body
        // Add deCrypted key in production
        const {dataFile, recordAddress} = await getFile(hashedKey)
        const targetProfile = dataFile[targetId]
        if(targetProfile === undefined){
            res.send("error! record not found")
        }
        targetProfile.totalMessages += 1;
        targetProfile.messages.push({
            "from": senderId,
            "message": message
        })
        dataFile[targetId] = targetProfile
        await addUpdatedRecord({upDatedRecord: dataFile, previousCDN: recordAddress, hashedKey: hashedKey})
        res.send("success")              
    }catch(e){
        console.log(e)
    }
})

MessageRouter.get('/see', async (req, res)=>{
    try{
        const {message, targetId, hashedKey, senderId} = req.body
        const {dataFile, recordAddress} = await getFile(hashedKey)
        res.send({dataFile, recordAddress})
    }catch(e){
        console.log(e)
    }
})

MessageRouter.get("arenewmessages", async (req, res)=>{
    
})



module.exports = {MessageRouter}