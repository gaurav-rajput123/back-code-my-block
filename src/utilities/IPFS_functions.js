const { ipfs } = require("../ipfsConfig");


// get the fileContent out of IPFS and the previous CDN of the IPFS file
const getFile = async (key) => {
    // const rayKey = key;
    try{
      // decrypt the ipns key
      // const ipnsKey = deCrypt(key)
      const ipnsKey = key 
      // The ipfs hash of the content
      let recordAddress = "";
      for await (const res of ipfs.name.resolve(ipnsKey)){
        recordAddress += res
      }
      recordAddress = recordAddress.substring(6)
      // the content to be obtained
      let dataFile = ""
      for await (const res of ipfs.cat(recordAddress)){
        dataFile += res
      }
      // converting it to json and return it to make changes to this data
      dataFile = JSON.parse(dataFile)
      return {dataFile: dataFile, recordAddress: recordAddress}
    }catch(e){
      console.log(e)
    }
  }
  
  
  // It removed the previous pinned content, adds the updated content, Pass the updated content to it and the previors cdn of the original record
  const addUpdatedRecord = async ({upDatedRecord, previousCDN, hashedKey}) => {
    try{
        const bufferData = Buffer.from(JSON.stringify(upDatedRecord))
        await ipfs.pin.rm(previousCDN)
        const savedRecord = await ipfs.add(bufferData)
        const newIPNS = await ipfs.name.publish(savedRecord.cid, {key: hashedKey})
        return newIPNS
    }catch(e){
        console.log(e)
    }
  }
  

  module.exports = {
      getFile, addUpdatedRecord
  }

