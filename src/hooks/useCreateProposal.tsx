import { useEffect, useState } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Proposal } from '../components/api/types';
import { VOTING_ADDRESS } from '../constants/address';

const useCreateProposal = (projectId: number) => {
  const { address } = useAccount();
  const [numOfOptions, setNumOfOptions] = useState<number>();
  const [minStake, setMinStake] = useState<number>();
  const [isLossVoting, setIsLossVoting] = useState<boolean>();
  const [isAllocationProposal, setIsAllocationProposal] = useState<boolean>();

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [ipfsHash, setIpfsHash] = useState('');

  const { config } = usePrepareContractWrite({
    address: VOTING_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_ipfsHash',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: '_numOfOptions',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: '_minimumStakeValue',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_isLossVoting',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: '_isAllocationProposal',
            type: 'bool',
          },
        ],
        name: 'createProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'createProposal',
    args: [
      ipfsHash,
      // @ts-ignore
      numOfOptions,
      // @ts-ignore
      minStake,
      // @ts-ignore
      isLossVoting,
      // @ts-ignore
      isAllocationProposal,
    ],
    account: address,
    enabled:
      ipfsHash !== '' &&
      numOfOptions !== undefined &&
      minStake !== undefined &&
      isLossVoting !== undefined &&
      isAllocationProposal !== undefined,
  });
  const { data, write } = useContractWrite(config);

  const {
    isLoading,
    isSuccess,
    data: txReceipt,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isDataLoaded) {
      fetch('/api/upload-ipfs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numOfOptions: numOfOptions,
          min_stake: minStake,
          isLossVoting,
          isAllocationProposal,
          userId: address,
          create_date: Date.now(),
          projectId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setIpfsHash(res.data);
        });
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (ipfsHash) {
      console.log('creating', ipfsHash);
      write?.();
    }
  }, [ipfsHash, write]);

  console.log({ ipfsHash, data, isLoading, isSuccess });

  return {
    createProposal: (
      proposalData: Pick<
        Proposal,
        'numOfOptions' | 'min_stake' | 'isLossVoting' | 'isAllocationProposal'
      >
    ) => {
      const { numOfOptions, min_stake, isLossVoting, isAllocationProposal } =
        proposalData;
      setNumOfOptions(numOfOptions);
      setMinStake(min_stake);
      setIsLossVoting(isLossVoting);
      setIsAllocationProposal(isAllocationProposal);

      setIsDataLoaded(true);
    },
    isLoading,
    isSuccess,
    txReceipt,
  };
};

export default useCreateProposal;
