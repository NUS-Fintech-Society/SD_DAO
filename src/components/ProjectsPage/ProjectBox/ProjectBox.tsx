import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { GrDocumentText } from 'react-icons/gr';
import { VscDiffAdded } from 'react-icons/vsc';
import React from 'react';

interface ProjectBoxProps {
  title?: string;
  aboutUrl?: string;
  viewUrl?: string;
  addUrl?: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
  title,
  aboutUrl,
  viewUrl,
  addUrl,
}) => {
  return (
    <div id="slide">
      <li className="border-gray-500 bg-gray-200 shadow-lg min-h-[300px] rounded-xl list-none">
        <h2 className="text-center text-2xl p-4">{title}</h2>
        <hr className="w-4/5 m-auto border-gray-400" />
        <div className="mt-8 pl-10">
          <a href={aboutUrl} className="block mb-5">
            <AiOutlineExclamationCircle className="inline mb-1 mr-2" />
            About
          </a>
          <a href={viewUrl} className="block mb-5">
            <GrDocumentText className="inline mb-1 mr-2" size={13} /> View
            Proposals
          </a>
          <a href={addUrl} className="block mb-5">
            <VscDiffAdded className="inline mb-1 mr-2" />
            Add a proposal
          </a>
        </div>
      </li>
    </div>
  );
};

export default ProjectBox;
