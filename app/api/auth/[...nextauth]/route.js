import NextAuth, { getServerSession } from "next-auth";
import {options} from "./options";
import { redirect } from "next/navigation";

const handler = NextAuth(options);
export { handler as GET, handler as POST }

export const requireAuthentication = (handler) => {
	return async (req, res) => {
		const session = await getServerSession(options);
		if(!session){
			redirect("/api/auth/signin?callbackUrl=/");
		}
		return handler(req, res);
	}
}

export const requireRole = (role) => {
	return (handler) => async (req, res) => {
		const session = await getServerSession(options);
		if(role.indexOf(session?.user?.role) === -1){
			redirect("/");	
		}
		return handler(req, res);
	} 
}