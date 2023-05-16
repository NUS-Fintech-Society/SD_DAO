import { useEffect, useState } from 'react';
import { retrieveProposal } from '../components/api/api';
import useGetProposals from './useGetProposals';

const useGetProposalsData = () => {
  const { data } = useGetProposals();
  const [proposalsData, setProposalsData] = useState<any[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      console.log('proposals data', data);
      data.forEach(async (proposal) => {
        const data = await retrieveProposal(proposal.ipfsHash);
        console.log({ data, proposal });
        setProposalsData((prev) => [...prev, data]);
      });
    }
  }, [data]);

  return { data: proposalsData };
};

export default useGetProposalsData;
