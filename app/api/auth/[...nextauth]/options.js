import GitHubProvider from "next-auth/providers/github";
import GoogleProvideer from "next-auth/providers/google";

const getUserRoles = (emailId) => {
	const allAdmin = process.env.ALL_ADMIN;
	const allSuperAdmin = process.env.ALL_SUPERADMIN;
	
	if(allAdmin.includes(emailId)){
		return 'admin'
	}else if(allSuperAdmin.includes(emailId)){
		return 'superadmin'
	}else {
		return 'user'
	}
}

export const options = {
	providers: [
		GitHubProvider({
			profile(profile){
				console.log("Profile GitHub: ", profile)
				const userRole = getUserRoles(profile.email) 
				
				return {
					...profile,
					role: userRole,
					image: profile.picture
				};
			},
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		GoogleProvideer({
			profile(profile){
				console.log("Profile Google: ", profile)
				const userRole = getUserRoles(profile.email)
				return {
					...profile,
					id: profile.sub,
					role: userRole,
					image: profile.picture
				}
			},
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})
	],
	callbacks: {
		async jwt({token, user}) {
			if(user) {
				token.role = user.role;
			};
			return token;
		},
		async session({session, token}){
			if(session?.user) session.user.role = token.role;
			return session;
		}
	}
}