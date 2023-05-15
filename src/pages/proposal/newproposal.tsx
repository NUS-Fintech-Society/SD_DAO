import { useSession } from "next-auth/react";
import CreateProjectPage from "../../components/CreateProjectPage/CreateProjectPage"


export default function createProposal() {
    const { data: session } = useSession();
    return (
        <>
      {session?
            <CreateProjectPage/>:
            <div className = "h-screen flex  min-h-screen -mt-16 proposalBackground items-center justify-center font-bold">
       
         Looks like you are not logged in, please sign in first!
         
          </div>
           
      }
           
        </>
    )
}


