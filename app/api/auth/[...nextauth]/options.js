import GitHubProvider from "next-auth/providers/github";
import GoogleProvideer from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

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
		}),
		Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "your email"
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "your password"
				}
			},
			async authorize(credentials){
				try{
					const foundUser = await User.findOne({email: credentials.email}).lean().exec();
					if(foundUser){
						console.log("User Exists");
						const match = await bcrypt.compare(credentials.password, foundUser.password);
						
						if(match){
							console.log("Good Pass");
							delete foundUser.password;
							foundUser["role"] = getUserRoles(foundUser.email);
							return foundUser;
						}
					}
				}catch(error){
					console.log(error);
				}
				return null
			}
		}),
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