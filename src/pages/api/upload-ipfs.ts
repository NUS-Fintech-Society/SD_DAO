import { NextApiRequest, NextApiResponse } from 'next';
import { create } from 'ipfs-http-client';

const auth =
  'Basic ' +
  Buffer.from(
    process.env.PROJECT_ID + ':' + process.env.PROJECT_SECRET
  ).toString('base64');

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

async function uploadProposal(text: string) {
  const added = await ipfs.add(text);
  return added.path;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const ipfsHash = await uploadProposal(JSON.stringify(req.body));

    return res.status(200).json({ data: ipfsHash });
  }
  return res.status(400).json({ data: '', message: 'bad request' });
}
