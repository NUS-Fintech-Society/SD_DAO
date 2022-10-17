import HeaderTextFormat from '../TextFormats/HeaderTextFormat';
import IndividualLineFormat from '../TextFormats/IndividualLineFormat';
export default function VoteAboutTab() {
  return (
    <>
      <div className="flex flex-col w-full space-y-10">
        <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
          <div className="p-8">
            <HeaderTextFormat header="About" info="ABCDao" />
            <HeaderTextFormat header="NetWork" info="Ethereum Mainnet" />
            <HeaderTextFormat header="Proposal Validation" info="basic" />
            <HeaderTextFormat header="Proposal Threshold" info="infinite" />
            <HeaderTextFormat header="Strategie(s)" info="erc20-balance-of" />
          </div>
        </div>
        <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
          <IndividualLineFormat header="Admins" />
          <IndividualLineFormat header="John" />
          <IndividualLineFormat header="Mark" />
          <IndividualLineFormat header="Sally" />
          <IndividualLineFormat header="Tim" type="last" />
        </div>

        <div className="flex flex-col border border-gray-100 shadow-lg rounded-lg w-full">
          <IndividualLineFormat header="Developers" />
          <IndividualLineFormat header="Jun Xiong" />
          <IndividualLineFormat header="Adithya Narayan" />
          <IndividualLineFormat header="Bryan Woo" type="last" />
        </div>
      </div>
    </>
  );
}
