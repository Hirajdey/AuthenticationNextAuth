"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const withAuthAndRole = (WrappedComponent, role) => {
	const WrapperComponent = (props) => {
		const {data:session, status} = useSession();
 		useEffect(() => {
			if(status === "authenticated"){
				if(role.indexOf(session?.user?.role) === -1){
					redirect('/');
				}
			}else if(status === "loading"){
				// handle loading state	
			}else{
				redirect('/api/auth/signin');
			}
		},[]);

		return <WrappedComponent {...props}/>
	}

  return WrapperComponent;
}

export default withAuthAndRole;