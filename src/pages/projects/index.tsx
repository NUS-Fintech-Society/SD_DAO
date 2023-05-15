import { useSession } from "next-auth/react";
import ProposalPage from "../../components/ProposalPage/ProposalPage";


export default function Projects() {
   const { data: session } = useSession();
 
  return (
    <>
      <div className="bg-proposal-page bg-scroll bg-cover bg-no-repeat bg-left-top min-h-screen -mt-16">
      {session? <ProposalPage />:
         <div className = "h-screen flex items-center justify-center font-bold">
       
         Looks like you are not logged in, please sign in first!
         
          </div>}
      </div>
    </>
  );
}
