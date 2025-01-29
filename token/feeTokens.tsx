export const feeTokens: Record<string, { name: string; symbol: string; type: string; decimals: number; address: string }[]> = {
    Sepolia: [
        {
            name: 'Sepolia',
            symbol: 'ETH',
            type: 'COIN',
            decimals: 18,
            address: ''
        }
    ],
    Amoy: [
        {
            name: 'Amoy',
            symbol: 'POL',
            type: 'COIN',
            decimals: 18,
            address: ''
        },
        {
            name: 'Sarvy',
            symbol: 'SAR',
            type: 'TOKEN',
            decimals: 9,
            address: '0xF757Dd3123b69795d43cB6b58556b3c6786eAc13'
        }
    ]
};
