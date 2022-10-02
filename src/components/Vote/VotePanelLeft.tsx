import Link from 'next/link';
import { useRouter } from 'next/router';
import VotePanelItem from './VotePanelItem';

interface VotePanelLeftProps {
  rightPanelName: string;
  setRightPanelName: (rightPanel: string) => void;
}

export function VotePanelLeft({
  rightPanelName,
  setRightPanelName,
}: VotePanelLeftProps) {
  const router = useRouter();
  return (
    <div className="relative flex flex-col border border-gray-200 shadow-lg text-center rounded-lg">
      <div className="text-xl z-10 my-3">ABCDao</div>
      {/* placeholder image */}
      <img
        className="rounded-full mx-auto w-1/2 h-1/2 z-10"
        src="https://rehabconceptspt.com/wp-content/uploads/2016/06/placeholder-640-square.jpg"
        alt="DAO Image"
        placeholder="placeholder"
      />
      <div className="absolute bg-gray-100 inset-x-0 bottom-0 h-3/5 rounded-b-lg"></div>
      <div className="flex flex-col space-y-3 z-10 text-left py-4 px-6 w-full text-lg font-medium">
        <VotePanelItem
          panelName="Proposals"
          rightPanelName={rightPanelName}
          setRightPanelName={setRightPanelName}
        />
        <div className="cursor-pointer hover:text-gray-400">
          <Link href={`${router.pathname}/new-proposal`}>New Proposal</Link>
        </div>
        <VotePanelItem
          panelName="About"
          rightPanelName={rightPanelName}
          setRightPanelName={setRightPanelName}
        />
      </div>
    </div>
  );
}
