export interface Proposal {
    map(arg0: (obj: any) => JSX.Element): import("react").ReactNode;
    ipfs: string;
    title: string;
    content: string;
    numOfOptions: number;
    min_stake: number;
    userId: string;
    create_date: number;
    type: string;
    options: { id: number; label: string }[];
    end_date: number;
    isLossVoting: boolean;
    isActive: boolean;
    isAllocationProposal: boolean;
  }
  
  export interface VoteInfo {
    proposalHash: string;
    voter: string;
    option: number;
    amount: number;
  }
  
  export interface ProposalInfo {
    ipfsHash: string;
    numOfOptions: number;
    minimumStakeValue: number;
    stakedValuePerOption: number[];
    votes: VoteInfo[];
    isActive: boolean;
    isLossVoting: boolean;
    isAllocationProposal: boolean;
    exists: boolean;
  }
  