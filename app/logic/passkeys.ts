import { Buffer } from "buffer";
import { ethers } from "ethers";
import { randomBytes } from 'react-native-randombytes';
import {
  Passkey,
  PasskeyCreateResult,
  PasskeyGetResult,
} from "react-native-passkey";

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
    console.log(passkeyCredentialObj);
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
        x: BigInt("0x" + Buffer.from(x).toString("hex")),
        y: BigInt("0x" + Buffer.from(y).toString("hex")),
      },
    };
  };
  
export type WebauthPublicKey = {
    x: bigint;
    y: bigint;
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
    console.log("passkeyCredential", passkeyCredential);
  
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
      x: bigint;
      y: bigint;
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
        x: passkey.pubkeyCoordinates.x.toString(),
        y: passkey.pubkeyCoordinates.y.toString(),
      },
    });
  }

const isPasskeySupported = Passkey.isSupported();

export {
    createPasskey,
    authenticatePasskey,
    isPasskeySupported,
    toBackendFormat,
  };