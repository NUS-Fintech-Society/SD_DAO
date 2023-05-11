import ProjectBox from "./ProjectBox"

const PrevProject = () => {
    return (
        <>
            <ProjectBox
                title="SD DAO"
                aboutUrl="/projects/about"
                viewUrl="/proposal"
                addUrl="/proposal/newproposal"
                />
            <ProjectBox
                title="SD Fintech Month"
                aboutUrl="/projects/about"
                viewUrl="/proposal"
                addUrl="/proposal/newproposal"
            />
            <ProjectBox
                title="SD HRMS"
                aboutUrl="/projects/about"
                viewUrl="/proposal"
                addUrl="/proposal/newproposal"
            />
        </>
    )
}

export default PrevProject;
