import ProjectBox from './ProjectBox';

const PrevProject = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <ProjectBox
        title="Potamus Loan - Real-time Loan and Instalment"
        aboutUrl="/projects/1/about"
        viewUrl="/projects/1"
        addUrl="/projects/1/create"
      />
      <ProjectBox
        title="Xfers NUS Transaction Risk Detection Website"
        aboutUrl="/projects/2/about"
        viewUrl="/projects/2"
        addUrl="/projects/2/create"
      />
      <ProjectBox
        title="Insurtech Computer Vision"
        aboutUrl="/projects/3/about"
        viewUrl="/projects/3"
        addUrl="/projects/3/create"
      />
    </div>
  );
};

export default PrevProject;
