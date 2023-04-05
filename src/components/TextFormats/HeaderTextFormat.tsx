import { useToast } from '@chakra-ui/react';

export default function HeaderTextFormat({
  header,
  info,
}: {
  header: string;
  info: string;
}) {
  const toast = useToast();
  return (
    <div className="flex flex-col space-y-1 mb-1">
      <div className="text-lg font-medium cursor-default line-clamp-1">
        {header}
      </div>
      <div
        className="text-md font-medium text-gray-500 cursor-pointer line-clamp-1"
        onClick={() => {
          toast({
            title: "Copied to clipboard",
            position: 'bottom-left',
            status: "success",
            duration: 3000,
            isClosable: true
          });
          navigator.clipboard.writeText(info);
        }}
      >
        {info}
      </div>
    </div>
  );
}
