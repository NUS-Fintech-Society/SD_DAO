import contract from './contract.json';
import ipfsClient from 'ipfs-http-client';
import Web3 from 'web3';
import type { Contract } from 'web3-eth-contract';
import { Proposal, ProposalInfo } from './types';
import { AbiItem } from 'web3-utils';

const IPFS_URL = 'abcdao.infura-ipfs.io';

const ipfs = ipfsClient.create({
  host: IPFS_URL,
  port: 5001,
  protocol: 'https',
});

let currentContract: Contract | undefined;

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

export function getContract(web3: Web3) {
  if (currentContract === undefined) {
    currentContract = new web3.eth.Contract(
      contract.abi as AbiItem[],
      contract.address
    );
  }
  return currentContract;
}

export async function getProposalHashes(web3: Web3): Promise<string[]> {
  const contract = getContract(web3);
  return contract.methods.getProposalHashes().call();
}

export async function getProposalInfo(
  web3: Web3,
  ipfsHash: string
): Promise<ProposalInfo> {
  const contract = getContract(web3);
  return contract.methods.getProposalInfo(ipfsHash).call();
}

export async function getAllProposals(web3: Web3) {
  const contract = getContract(web3);
  return contract.methods.getAllProposals().call();
}

export async function getVotesForOption(
  web3: Web3,
  ipfsHash: string,
  optionIndex: number
) {
  const contract = getContract(web3);
  return contract.methods.getVotesForOption(ipfsHash, optionIndex).call();
}

export async function initialiseUser(
  web3: Web3,
  account: string,
  userAccount: string
) {
  const contract = getContract(web3);
  try {
    return await contract.methods
      .initialiseUser(userAccount)
      .send({ from: account });
  } catch (err) {
    console.log(`Unsuccessful init of ${userAccount}`);
  }
}

//can change anything except .create proposal
export async function createProposal(
  web3: Web3,
  account: string | null,
  values: Pick<
    Proposal,
    'numOfOptions' | 'min_stake' | 'isLossVoting' | 'isAllocationProposal'
  >
) {
  const contract = getContract(web3);
  const ipfsHash = await uploadProposal(JSON.stringify(values));
  try {
    return await contract.methods
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
  web3: Web3,
  account: string,
  ipfsHash: string,
  isActive: boolean
) {
  const contract = getContract(web3);
  try {
    return await contract.methods
      .setProposalStatus(ipfsHash, isActive)
      .send({ from: account });
  } catch (err) {
    console.log('Unsuccessful setting of Proposal Status');
  }
}

export async function sendVote(
  web3: Web3,
  account: string | null,
  ipfsHash: string,
  optionIndex: number,
  stakeValue: number
) {
  const contract = getContract(web3);
  const amt = String(stakeValue * 1000000000000000000);
  try {
    return await contract.methods
      .vote(ipfsHash, optionIndex, amt)
      .send({ from: account });
  } catch (err) {
    console.log('Unsuccessful voting on proposal');
  }
}
