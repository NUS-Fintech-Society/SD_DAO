import ProjectBox from './ProjectBox';

const NextProject = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <ProjectBox
        title="Internal HRMS"
        aboutUrl="/projects/4/about"
        viewUrl="/projects/4"
        addUrl="/projects/4/create"
      />
      <ProjectBox
        title="Superflow - On-chain subscriptions platform"
        aboutUrl="/projects/5/about"
        viewUrl="/projects/5"
        addUrl="/projects/5/create"
      />
      <ProjectBox
        title="TriArbX - Triangular Arbitrage on Uniswap"
        aboutUrl="/projects/6/about"
        viewUrl="/projects/6"
        addUrl="/projects/6/create"
      />
    </div>
  );
};

export default NextProject;
