export interface BaseUserOperation {
    sender: string;
    nonce: bigint;
    callData: string;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    signature: string;
}
export interface UserOperationV6 extends BaseUserOperation {
    initCode: string;
    paymasterAndData: string;
}