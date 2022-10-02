import { Proposal } from '../api/types';
import { useEffect, useState } from 'react';
import { getProposalHashes, retrieveProposal } from '../api/api';
import VoteListItem from './VoteListItem';

export default function VoteList() {
  const [proposalList, setProposalList] = useState<Proposal[]>([]);
  const [proposalToShow, setProposalToShow] = useState(0);

  useEffect(() => {
    if (proposalList.length === 0) {
      getProposalHashes().then((proposalData: string[]) => {
        setProposalToShow(proposalData.length);
        if (proposalData.length) {
          proposalData.forEach(async (element) => {
            if (element) {
              await retrieveProposal(element).then((data) => {
                const new_data = { ...data, ipfs: element };
                setProposalList((prevState) => [...prevState, new_data]);
              });
            }
          });
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {proposalList.length === proposalToShow ? (
        proposalList
          .sort((a, b) => b.create_date - a.create_date)
          .map((vote) => <VoteListItem content={vote} key={vote.ipfs} />)
      ) : (
        <VoteListItem skeleton />
      )}
    </div>
  );
}
