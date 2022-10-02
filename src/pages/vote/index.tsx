import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import VoteAboutTab from '../../components/Vote/VoteAboutTab';
import VoteList from '../../components/Vote/VoteList';
import { VotePanelLeft } from '../../components/Vote/VotePanelLeft';

export default function Vote() {
  const [rightPanelName, setRightPanelName] = useState('Proposals');
  const router = useRouter();

  function PanelRight() {
    if (rightPanelName === 'Proposals') {
      return (
        <div className="w-full">
          <VoteList />
        </div>
      );
    }
    if (rightPanelName === 'About') {
      return <VoteAboutTab />;
    }
    return null;
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col max-w-7xl mx-auto p-2 mb-10">
        <div className="w-full">
          <div className="flex flex-row items-center justify-between px-4 ">
            <div className="text-4xl text-gray-700 my-4">Proposals</div>
            <div className="flex lg:hidden">
              <Link href={`${router.pathname}/new-proposal`}>
                <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-indigo-100">
                  New Proposal
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-row space-x-6 w-full">
            <div className="w-1/3">
              <VotePanelLeft
                rightPanelName={rightPanelName}
                setRightPanelName={setRightPanelName}
              />
            </div>
            <PanelRight />
          </div>
          <div className="flex flex-col w-full lg:hidden space-y-4">
            <VoteList />
          </div>
        </div>
      </div>
    </div>
  );
}
