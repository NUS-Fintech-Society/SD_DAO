import { toast } from 'react-toastify';

export default function HeaderTextFormat({
  header,
  info,
}: {
  header: string;
  info: string;
}) {
  const copyNotification = () =>
    toast.info('Copied to clipboard', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="flex flex-col space-y-1 mb-1">
      <div className="text-lg font-medium cursor-default line-clamp-1">
        {header}
      </div>
      <div
        className="text-md font-medium text-gray-500 cursor-pointer line-clamp-1"
        onClick={() => {
          copyNotification();
          navigator.clipboard.writeText(info);
        }}
      >
        {info}
      </div>
    </div>
  );
}
