import Link from 'next/link';

import { useRouter } from 'next/router';

import { Proposal } from '../api/types';
import { getShortAccountHash } from '../api/utils';
import { getCurrentDateTime, getReadableDate } from './voteUtils';

interface VoteListItemProps {
  content?: Proposal;
  skeleton?: boolean;
}

export default function VoteListItem({ content, skeleton }: VoteListItemProps) {
  const router = useRouter();

  if (skeleton) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="border border-gray-100 rounded-md w-full hover:bg-indigo-50 shadow-md">
          <div className="animate-pulse bg-gray-100 py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer h-56"></div>
        </div>
        <div className="border border-gray-100 rounded-md w-full hover:bg-indigo-50 shadow-md">
          <div className="animate-pulse bg-gray-100 py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer h-56"></div>
        </div>
        <div className="border border-gray-100 rounded-md w-full hover:bg-indigo-50 shadow-md">
          <div className="animate-pulse bg-gray-100 py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer h-56"></div>
        </div>
        <div className="border border-gray-100 rounded-md w-full hover:bg-indigo-50 shadow-md">
          <div className="animate-pulse bg-gray-100 py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer h-56"></div>
        </div>
        <div className="border border-gray-100 rounded-md w-full hover:bg-indigo-50 shadow-md">
          <div className="animate-pulse bg-gray-100 py-4 px-4 flex flex-col text-gray-400 hover:text-gray-800 cursor-pointer h-56"></div>
        </div>
      </div>
    );
  }
  if (!content) {
    return null;
  }

  return (
    <div className="flex flex-col border border-gray-200 shadow-sm rounded-md w-full hover:bg-indigo-100">
      <Link href={`${router.route}/${content.ipfs}`}>
        <div className="flex flex-col py-4 px-4 text-gray-400 hover:text-gray-800 cursor-pointer">
          <div className="flex flex-row justify-between mb-1">
            <div className="text-base font-light">
              Post by {getShortAccountHash(content.userId)}
            </div>
            {getCurrentDateTime() < content.end_date ? (
              <div className="flex bg-green-500 text-white px-4 p-1 rounded-full text-sm font-medium text-center">
                Active
              </div>
            ) : (
              <div className="flex bg-red-500 text-white px-4 p-1 rounded-full text-sm font-medium text-center">
                Closed
              </div>
            )}
          </div>
          <div className="text-gray-800 text-3xl mb-1 font-semibold line-clamp-1">
            {content.title}
          </div>
          <div className="text-lg font-normal mb-1 overflow-ellipsis overflow-hidden line-clamp-4">
            {content.content}
          </div>
          <div className="text-base font-light">
            {getReadableDate(content.create_date)}
          </div>
        </div>
      </Link>
    </div>
  );
}
