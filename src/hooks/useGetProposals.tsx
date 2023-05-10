import { useContractRead } from 'wagmi';
import votingAbi from '../components/api/votingAbi';
import { VOTING_ADDRESS } from '../constants/address';

const useGetProposals = () => {
  return useContractRead({
    address: VOTING_ADDRESS,
    abi: votingAbi,
    functionName: 'getProposalHashes',
  });
};

export default useGetProposals;
