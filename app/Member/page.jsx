import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options";
import { requireAuthentication, requireRole } from "../api/auth/[...nextauth]/route";
import { SUPER_ADMIN } from "../(components)/constant";

// Remember if you don't add 'use client' statement it's going to be render the page on server side   
const Member = async () => {
  const session = await getServerSession(options);
  
  return ( 
    <div><h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  )
}

export default requireAuthentication(requireRole(SUPER_ADMIN)(Member));