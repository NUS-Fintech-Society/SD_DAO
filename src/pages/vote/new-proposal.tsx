import NewProposal from "../../components/Vote/NewProposal";

const NewProposalPage = () => {
  return (
    <div className="bg-new-proposal-page bg-no-repeat bg-cover bg-left-top h-screen -mt-16">
      <div className="w-full h-full">
        <div className="flex flex-col max-w-7xl mx-auto p-2 mb-10">
          <NewProposal />
        </div>
      </div>
    </div>
  );
};

export default NewProposalPage;
