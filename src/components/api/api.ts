import { create } from 'ipfs-http-client';
import { getContract } from 'viem';
import { Proposal, ProposalInfo } from './types';

const IPFS_URL = 'abcdao.infura-ipfs.io';

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
});

export async function uploadProposal(text: string) {
  const added = await ipfs.add(text);
  return added.path;
}

export async function retrieveProposal(
  proposalHash: string
): Promise<Proposal> {
  return fetch(`https://${IPFS_URL}/ipfs/${proposalHash}`).then((x) =>
    x.json()
  );
}

export async function getProposalHashes(): Promise<string[]> {
  const contract = getContract();
  return contract.getProposalHashes();
}

export async function getProposalInfo(ipfsHash: string): Promise<ProposalInfo> {
  const contract = getContract();
  return contract.getProposalInfo(ipfsHash);
}

export async function getAllProposals() {
  const contract = getContract();
  return contract.getAllProposals();
}

export async function getVotesForOption(ipfsHash: string, optionIndex: number) {
  const contract = getContract();
  return contract.getVotesForOption(ipfsHash, optionIndex);
}

export async function initialiseUser(account: string, userAccount: string) {
  const contract = getContract();
  try {
    return await contract.initialiseUser(userAccount).send({ from: account });
  } catch (err) {
    console.log(`Unsuccessful init of ${userAccount}`);
  }
}

//can change anything except .create proposal
export async function createProposal(
  account: string | null,
  values: Pick<
    Proposal,
    'numOfOptions' | 'min_stake' | 'isLossVoting' | 'isAllocationProposal'
  >
) {
  const contract = getContract();
  const ipfsHash = await uploadProposal(JSON.stringify(values));
  try {
    return await contract
      .createProposal(
        ipfsHash,
        values['numOfOptions'],
        values['min_stake'],
        values['isLossVoting'],
        values['isAllocationProposal']
      )
      .send({ from: account });
  } catch (err) {
    console.log(err);
    console.log('Unsuccessful setting of Proposal Status');
    return false;
  }
}

export async function setProposalStatus(
  account: string,
  ipfsHash: string,
  isActive: boolean
) {
  const contract = getContract();
  try {
    return await contract
      .setProposalStatus(ipfsHash, isActive)
      .send({ from: account });
  } catch (err) {
    console.log('Unsuccessful setting of Proposal Status');
  }
}

export async function sendVote(
  account: string | null,
  ipfsHash: string,
  optionIndex: number,
  stakeValue: number
) {
  const contract = getContract();
  const amt = String(stakeValue * 1000000000000000000);
  try {
    return await contract
      .vote(ipfsHash, optionIndex, amt)
      .send({ from: account });
  } catch (err) {
    console.log('Unsuccessful voting on proposal');
  }
}
