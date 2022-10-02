import { useRouter } from 'next/router';
import VoteDetail from '../../components/Vote/VoteDetail';

const ProposalPage = () => {
  const router = useRouter();
  const id = (router.query as { id?: string }).id;

  if (!id) return null;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col max-w-7xl mx-auto p-2 mb-10">
        <VoteDetail ipfsHash={id} />
      </div>
    </div>
  );
};

export default ProposalPage;
