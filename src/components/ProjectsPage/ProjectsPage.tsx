import { useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import NextProject from './ProjectBox/NextProject';
import PrevProject from './ProjectBox/PrevProjects';

export default function ProjectsPage() {
  const [nextPage, setNextPage] = useState(false);

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
    <div className="flex items-center justify-center flex-col space-y-4">
      <h1 className="text-center text-5xl pt-12 pb-6">Projects</h1>
      <div className="flex h-full place-items-center w-full">
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
        <div className="w-8/12 flex-none relative">
          {!nextPage && (
            <>
              <div className="flex space-x-16 w-full justify-center">
                <PrevProject />
              </div>
            </>
          )}
          {nextPage && (
            <>
              <div className="flex space-x-16 w-full justify-center">
                <NextProject />
              </div>
            </>
          )}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 content-center flex space-x-8">
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
