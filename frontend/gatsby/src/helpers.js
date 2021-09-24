export function createMetadata(name, imageUrl, description, strength, speed, power, intelligence ) {
    let metadata = 
    {
      image: imageUrl, 
      name: name,
      description: description,
      attributes: [
        {
          trait_type: "Strength", 
          value: strength,
          max_value: 100
        }, 
        {
          trait_type: "Speed", 
          value: speed,
          max_value: 100
        }, 
        {
          trait_type: "Power", 
          value: power,
          max_value: 100
        }, 
        {
          trait_type: "Intelligence", 
          value: intelligence,
          max_value: 100
        }, 
      ]
    }

    return JSON.stringify(metadata)
  }

export async function getMetadataFromIpfs(ipfs, cid) {
    const stream = ipfs.cat(cid)
    let data = ''

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }

    console.log(JSON.parse(data))
    return JSON.parse(data)
}

export async function addMetadataToIpfs(ipfs, metadata) {
    const { cid } = await ipfs.add(metadata)
    return cid.toString()
}