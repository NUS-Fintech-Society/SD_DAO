import CreateProposalPage from '../../components/CreateProposalPage/CreateProposalPage';

const NewProposalPage = () => {
  return (
    <div className="bg-new-proposal-page bg-scroll bg-cover bg-no-repeat bg-left-top min-h-screen pt-16">
      <div className="px-20 pt-36 lg:pt-40 xl:pt-48 2xl:pt-64">
        <div className="w-full h-full">
          <div className="flex flex-col p-2 mx-auto pb-10">
            <CreateProposalPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposalPage;
