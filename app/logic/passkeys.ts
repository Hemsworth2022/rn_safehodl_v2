import { Buffer } from "buffer";
import { ethers } from "ethers";
import { randomBytes } from 'react-native-randombytes';
import {
  Passkey,
  PasskeyCreateResult,
  PasskeyGetResult,
} from "react-native-passkey";
import {UserOperationV6} from './types';
import * as cbor from "cbor-web";


export type PasskeyCredentialWithPubkeyCoordinates = PasskeyCreateResult & {
    pubkeyCoordinates: WebauthPublicKey;
};

const getPasskeyWithCoordinates = async (
    passkeyCredential: PasskeyCreateResult
  ): Promise<PasskeyCredentialWithPubkeyCoordinates> => {
    let passkeyCredentialObj = passkeyCredential;
    if (typeof passkeyCredential === "string") {
      passkeyCredentialObj = JSON.parse(passkeyCredential);
    }
    // console.log(passkeyCredentialObj);
    const attestationBuffer = Buffer.from(
      passkeyCredentialObj.response.attestationObject,
      "base64"
    );
    const decodedAttestation = await cbor.decodeFirst(attestationBuffer);
    const authData = decodedAttestation.authData;
    const flags = authData[32];
    const hasAttestedCredentialData = !!(flags & 0x40);
    if (!hasAttestedCredentialData) {
      throw new Error("No attested credential data found");
    }
    const credentialIdLength = (authData[53] << 8) | authData[54];
    const publicKeyBytes = authData.slice(55 + credentialIdLength);
    const publicKeyCose = await cbor.decodeFirst(publicKeyBytes);
    const x = publicKeyCose.get(-2);
    const y = publicKeyCose.get(-3);
    return {
      ...passkeyCredentialObj,
      pubkeyCoordinates: {
        x: ("0x" + Buffer.from(x).toString("hex")),
        y: ("0x" + Buffer.from(y).toString("hex")),
      },
    };
  };
  
export type WebauthPublicKey = {
    x: string;
    y: string;
};

export const rp = {
    id: "userapi.beldex.dev",    // proper name web->domain, mobile->from attestation url
    name: "safehodl.dev",
};
  
const challenge = bufferToBase64URLString(
    randomBytes(32) // Generates a secure random Uint8Array of 32 bytes
);

export function bufferToBase64URLString(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let str = "";
  
    for (const charCode of bytes) {
      str += String.fromCharCode(charCode);
    }
  
    const base64String = btoa(str);
  
    return base64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Login passkey for using wallet.
 */
const authenticatePasskey = async (): Promise<PasskeyGetResult | null> => {
    let json = await Passkey.get({
      rpId: rp.id,
      challenge,
      userVerification: "required",
      // NOTE: We can add allowCredentials if we want to authenticate with a specific passkey,
      // but we don't have credentialId (rawId) since we don't have the user details during recovery
      // ...(credentialId && {
      //   allowCredentials: [{ id: credentialId, type: 'public-key' }],
      // }),
    });
    console.log("json", json);
  
    if (!json) {
      throw new Error(
        "Failed to generate passkey. Received null as a credential"
      );
    }
  
    if (typeof json === "string") {
      json = JSON.parse(json);
    }
  
    const rawId = json.rawId;
    console.log("Received rawId:", rawId);
    return json;
  };

/**
 * Creates a passkey for signing.
 *
 * @returns A promise that resolves to a PasskeyCredentialWithPubkeyCoordinates object, which includes the passkey credential information and its public key coordinates.
 * @throws Throws an error if the passkey generation fails or if the credential received is null.
 */
async function createPasskey(userName:string): Promise<PasskeyCredentialWithPubkeyCoordinates | null> {
    const passkeyCredential: PasskeyCreateResult = await Passkey.create({
      pubKeyCredParams: [
        {
          // ECDSA w/ SHA-256: https://datatracker.ietf.org/doc/html/rfc8152#section-8.1
          alg: -7,
          type: "public-key",
        },
      ],
      challenge,
      rp,
      user: {
        displayName: userName,
        id: bufferToBase64URLString(randomBytes(32)), //random generation
        name: userName,
      },
      timeout: 120000,
      attestation: "none",
      authenticatorSelection: {
        requireResidentKey: true,
        userVerification: "required",
      },
    });
    // console.log("passkeyCredential", passkeyCredential);
  
    if (!passkeyCredential) {
      throw new Error(
        "Failed to generate passkey. Received null as a credential"
      );
    }
  
    return getPasskeyWithCoordinates(passkeyCredential);
}

export type PasskeyLocalStorageFormat = {
    rawId: string;
    pubkeyCoordinates: {
      x: string;
      y: string;
    };
  };

/**
 * Converts a PasskeyCredentialWithPubkeyCoordinates object to a format that can be stored in the backend.
 * The rawId is required for signing and pubkey coordinates are for our convenience.
 * @param passkey - The passkey to be converted.
 * @returns The passkey in a format that can be stored in the backend.
 */
function toBackendFormat(
    passkey: PasskeyCredentialWithPubkeyCoordinates
  ): string {
    return JSON.stringify({
      rawId: passkey.rawId,
      pubkeyCoordinates: {
        x: passkey.pubkeyCoordinates.x,
        y: passkey.pubkeyCoordinates.y,
      },
    });
  }

/**
 * Extracts the signature into R and S values from the authenticator response.
 *
 * See:
 * - <https://datatracker.ietf.org/doc/html/rfc3279#section-2.2.3>
 * - <https://en.wikipedia.org/wiki/X.690#BER_encoding>
 */
function extractSignature(
    signature: ArrayBuffer | Uint8Array
  ): [bigint, bigint] {
    let sig: ArrayBuffer;
    if (signature instanceof Uint8Array) {
      sig = signature.buffer;
    } else {
      sig = signature;
    }
  
    const check = (x: boolean) => {
      if (!x) {
        throw new Error("invalid signature encoding");
      }
    };
  
    // Decode the DER signature. Note that we assume that all lengths fit into 8-bit integers,
    // which is true for the kinds of signatures we are decoding but generally false. I.e. this
    // code should not be used in any serious application.
    const view = new DataView(sig);
  
    const sequenceTag = view.getUint8(0);
    const sequenceLength = view.getUint8(1);
  
    console.log("Sequence tag:", sequenceTag.toString(16));
    console.log("Sequence length:", sequenceLength);
    console.log("Buffer length - 2:", view.byteLength - 2);
  
    // check that the sequence header is valid
    check(view.getUint8(0) === 0x30);
    check(view.getUint8(1) === view.byteLength - 2);
  
    // read r and s
    const readInt = (offset: number) => {
      check(view.getUint8(offset) === 0x02);
      const len = view.getUint8(offset + 1);
      const start = offset + 2;
      const end = start + len;
      const n = BigInt(
        ethers.hexlify(new Uint8Array(view.buffer.slice(start, end)))
      );
      check(n < ethers.MaxUint256);
      return [n, end] as const;
    };
    const [r, sOffset] = readInt(2);
    const [s] = readInt(sOffset);
  
    return [r, s];
}

export function base64URLStringToString(base64URLString: string): string {
    // Replace URL-safe characters back to standard base64 characters
    const base64 = base64URLString
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(
        base64URLString.length + ((4 - (base64URLString.length % 4)) % 4),
        "="
      );
  
    // Decode base64 to string
    return atob(base64);
}

/**
 * Compute the additional client data JSON fields. This is the fields other than `type` and
 * `challenge` (including `origin` and any other additional client data fields that may be
 * added by the authenticator).
 *
 * See <https://w3c.github.io/webauthn/#clientdatajson-serialization>
 */
function extractClientDataFields(
    response: PasskeyGetResult["response"]
  ): string {
    // Decode base64 string to JSON
    // const clientDataJSON = Buffer.from(response.clientDataJSON, 'base64').toString('utf-8');
    const clientDataJSON = base64URLStringToString(response.clientDataJSON);
    const parsedData = JSON.parse(clientDataJSON);
  
    console.log("Decoded clientDataJSON:", parsedData);
    // Example output:
    // {
    //   "type": "webauthn.get",
    //   "challenge": "9lhjBo21j74XrM9OpmesTJMV9E3UOiMAwgIRz0eFj7c",
    //   "origin": "https://7dcb-178-19-186-193.ngrok-free.app"
    // }
  
    const match = clientDataJSON.match(
      /^\{"type":"webauthn.get","challenge":"[A-Za-z0-9\-_]{43}",(.*)\}$/
    );
  
    if (!match) {
      throw new Error("challenge not found in client data JSON");
    }
  
    const [, fields] = match;
    console.log("Decoded fields:", fields);
    return clientDataJSON;
}

/**
 * SignUserOp for sending the transaction
 */ 
// async function signUserOp(
//     userOp: UserOperationV6,
//     passkeyData: PasskeyLocalStorageFormat
// ) 
async function signUserOp(){
    // console.log(passkeyData, "passkeyData");

    const userOpHash:string = "0x71c60dda15d76ffe4a374979e95c3f8fff6e41097b62e0382722ae3c1314d0a5";
    // const userOpHash = await entryContract.methods.getUserOpHash(userOp).call();
    console.log({ userOpHash });
    const challenge = bufferToBase64URLString(ethers.getBytes(userOpHash));
    let assertion = await Passkey.get({
        rpId: rp.id,
        challenge: challenge,
        userVerification: "required",
        allowCredentials: [{ id: "gX71vmVAlPYdo22RekhXVA", type: "public-key" }],
    });

    if (!assertion) {
        throw Error("assertion null");
    }

    if (typeof assertion === "string") {
        assertion = JSON.parse(assertion);
    }
    console.log({assertion});

    const signatureBase64 = assertion.response.signature;
    const signatureBuffer = Buffer.from(signatureBase64, "base64");
    const sign = extractSignature(signatureBuffer);

    const clientDataJSON = extractClientDataFields(assertion.response);
    const challengePos = clientDataJSON.indexOf(challenge);
    const challengePrefix = clientDataJSON.substring(0, challengePos);
    const challengeSuffix = clientDataJSON.substring(
        challengePos + challenge.length
    );

    const authenticatorData = new Uint8Array(Buffer.from(
        assertion.response.authenticatorData,
        "base64"
      ).buffer);

    const sig = {
        r: sign[0],
        s: sign[1],
        authData: authenticatorData,
        clientDataPrefix: challengePrefix,
        clientDataSuffix: challengeSuffix,
    };

    console.log({ sig });

    let encodedSig = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "uint256", "bytes", "string", "string"],
        [
            sig.r,
            sig.s,
            sig.authData,
            sig.clientDataPrefix,
            sig.clientDataSuffix,
        ]
    );
   const signature = encodedSig;

    console.log({ signature });
}
const isPasskeySupported = Passkey.isSupported();

export {
    createPasskey,
    authenticatePasskey,
    signUserOp,
    isPasskeySupported,
    toBackendFormat,
  };