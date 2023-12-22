export const CONTRACT_ADDRESS = '0xd55741c6700C7656aB12Cb72df754147758A1D2E';

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'priceFeed',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'FundMe__NotOwner',
    type: 'error'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [],
    name: 'MINIMUM_USD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cheaperWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'fundingAddress',
        type: 'address'
      }
    ],
    name: 'getAddressToAmountFunded',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getFunder',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getVersion',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
];

export const CHAIN_NAMES = {
  1: 'Ethereum (Mainnet)',
  11155111: 'Ethereum (Sepolia)',
  1337: 'Anvil / Localnet'
};
