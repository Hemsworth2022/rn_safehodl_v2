export const coinList: Record<string, { name: string; symbol: string; type: string; decimals: number; address: string }[]> = {
    Sepolia: [
        {
            name: 'Sepolia',
            symbol: 'ETH',
            type: 'COIN',
            decimals: 18,
            address: ''
        },
        {
            name: 'Shibua',
            symbol: 'SHIB',
            type: 'TOKEN',
            decimals: 8,
            address: '0x6dbA02d1A9f8248aCe5fFE63a0d75e98C157a430'
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
        },
        {
            name: 'Ronin',
            symbol: 'RON',
            type: 'TOKEN',
            decimals: 9,
            address: '0x3Fcc9E5f80325dc425C6bB5252B0A9E336d19e61'
        }
    ]
};
