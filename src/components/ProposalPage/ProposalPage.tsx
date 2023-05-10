import { useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import useGetProposals from '../../hooks/useGetProposals';
import NextProject from './ProjectBox/NextProject';
import PrevProject from './ProjectBox/PrevProjects';

export default function ProjectsPage() {
  const [nextPage, setNextPage] = useState(false);
  const { data } = useGetProposals();

  console.log({ data });

  function handleNextPage() {
    if (!nextPage) {
      setNextPage(!nextPage);
    }
  }

  function handlePrevPage() {
    if (nextPage) {
      setNextPage(!nextPage);
    }
  }

  return (
    <div>
      <h1 className="absolute top-1/4 -translate-y-1/4 left-1/2 -translate-x-1/2 text-5xl">
        Projects
      </h1>
      <div className="flex h-screen place-items-center">
        <div className="w-2/12 flex items-center">
          <div className="w-full text-right">
            <button onClick={handlePrevPage} className="mr-3">
              <HiOutlineArrowLeft
                className="hover:-translate-x-0.5"
                size={40}
              />
            </button>
          </div>
        </div>
        <div className="w-8/12 h-[290px] flex-none  relative">
          {!nextPage && (
            <>
              <div className="flex space-x-16 absolute w-full justify-center">
                <PrevProject />
              </div>
            </>
          )}
          {nextPage && (
            <>
              <div className="flex space-x-16 absolute w-full justify-center">
                <NextProject />
              </div>
            </>
          )}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 content-center flex space-x-8">
            {nextPage && (
              <>
                <span className="w-8 h-1 bg-gray-200"></span>
                <span className="w-8 h-1 bg-gray-800"></span>
              </>
            )}
            {!nextPage && (
              <>
                <span className="w-8 h-1 bg-gray-800"></span>
                <span className="w-8 h-1 bg-gray-200"></span>
              </>
            )}
          </div>
        </div>

        <div className="w-2/12 flex items-center">
          <div className="w-full">
            <button onClick={handleNextPage} className="ml-3">
              <HiOutlineArrowRight
                className="hover:translate-x-0.5"
                size={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
