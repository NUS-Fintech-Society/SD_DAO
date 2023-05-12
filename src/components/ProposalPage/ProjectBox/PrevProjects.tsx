import ProjectBox from './ProjectBox';

const PrevProject = () => {
  return (
    <>
      <ProjectBox
        title="Project 01"
        aboutUrl="/projects/about"
        viewUrl="/proposal"
        addUrl="/proposal/new"
      />
      <ProjectBox
        title="Project 02"
        aboutUrl="/projects/about"
        viewUrl="/proposal"
        addUrl="/proposal/new"
      />
      <ProjectBox
        title="Project 03"
        aboutUrl="/projects/about"
        viewUrl="/proposal"
        addUrl="/proposal/new"
      />
    </>
  );
};

export default PrevProject;
