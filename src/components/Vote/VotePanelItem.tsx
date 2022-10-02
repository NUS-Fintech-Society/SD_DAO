interface VotePanelItemProps {
  panelName: string;
  rightPanelName: string;
  setRightPanelName: (rightPanel: string) => void;
}

export default function VotePanelItem({
  panelName,
  rightPanelName,
  setRightPanelName,
}: VotePanelItemProps) {
  return (
    <div
      className={
        rightPanelName === panelName
          ? 'border-r-4 border-indigo-500 cursor-pointer hover:text-gray-400 hover:border-indigo-300'
          : 'cursor-pointer hover:text-gray-400'
      }
      onClick={() => setRightPanelName(panelName)}
    >
      {panelName}
    </div>
  );
}
