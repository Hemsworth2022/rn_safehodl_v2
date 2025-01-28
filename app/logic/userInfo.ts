import Web3, { HexString } from 'web3'; // Ensure Web3.js is correctly imported
import LouiceFactory from "../abi/LouiceFactory.json";

const SALT = 21

const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PAYMASTER_ADDRESS = "0xDd74396fb58c32247d8E2410e853a73f71053252";
const SECP256R1_VERIFIER = "0x8999C00F8ca1DB25c86260fdd77889fb9b2CEcaf";
const LOUICE_FACTORY = "0x0cA86987e13568500BCC4238a9d6F8988BAF6A86";

const getEstimateAddress = async (rawId: any, publicKeys: any[]): Promise<any> => {
    console.log("called getestimate address");
    const web3: Web3 = new Web3('https://bundler.beldex.dev/rpc');
    const LouiceFactoryIn = new web3.eth.Contract(LouiceFactory.abi, LOUICE_FACTORY);

    const prefix = "0x04";
    const publicKey = prefix + publicKeys[0].slice(2) + publicKeys[1].slice(2);

    try {
        const estimatedAddress = await LouiceFactoryIn.methods.getAddress(
            SECP256R1_VERIFIER,
            publicKey,
            SALT
        ).call(); 

        console.log("Done calling getEstimateAddress:", estimatedAddress);
        return estimatedAddress; //  Return the resolved value
    } catch (error) {
        console.error("Error in getEstimateAddress:", error);
        throw error;
    }
};

//TODO have to send arguments as object 
const storePubkey = async (name:any, rawId:any, X:any, Y:any) =>{
    const payload = { name, rawId, X, Y};
    console.log("signUp payload:", payload);

    try {
        const response = await fetch("https://userapi.beldex.dev/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json(); // Parse the JSON response
        console.log("result",result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const getPubkeys = async(id:string): Promise<any> =>{
    // check the wallet key is present in the contract or not.
    // if it is not present then call login server to get the keys.
    const payload = { rawId: id };
    console.log("Login payload:", payload);
    try {
        const response = await fetch("https://userapi.beldex.dev/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json(); // Parse the JSON response
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("wallet is not exist");
        throw error;
    }
}

export{
    SALT,
    ENTRYPOINT,
    PAYMASTER_ADDRESS,
    SECP256R1_VERIFIER,
    LOUICE_FACTORY,
    storePubkey,
    getPubkeys,
    getEstimateAddress
}

