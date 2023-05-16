import { useContractRead } from 'wagmi';
import { VOTING_ADDRESS } from '../constants/address';

const useGetProposals = () => {
  return useContractRead({
    address: VOTING_ADDRESS,
    abi: [
      {
        inputs: [],
        name: 'getAllProposals',
        outputs: [
          {
            components: [
              {
                internalType: 'string',
                name: 'ipfsHash',
                type: 'string',
              },
              {
                internalType: 'uint8',
                name: 'numOfOptions',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'minimumStakeValue',
                type: 'uint256',
              },
              {
                internalType: 'uint256[]',
                name: 'stakedValuePerOption',
                type: 'uint256[]',
              },
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'proposalHash',
                    type: 'string',
                  },
                  {
                    internalType: 'address',
                    name: 'voter',
                    type: 'address',
                  },
                  {
                    internalType: 'uint8',
                    name: 'option',
                    type: 'uint8',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct Voting.VoteInfo[]',
                name: 'votes',
                type: 'tuple[]',
              },
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'isLossVoting',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'isAllocationProposal',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'exists',
                type: 'bool',
              },
            ],
            internalType: 'struct Voting.ProposalInfo[]',
            name: 'proposalInfos',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
      },
    ],
    functionName: 'getAllProposals',
  });
};

export default useGetProposals;
