'use client'

import { useState } from "react"

const useCreateUsers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const handleCreateUsersRequest = async ({formData}) => {
		const res = await fetch("/api/Users", {
			method: "POST",
			body: JSON.stringify({
				formData
			}),
			"content-type": "application/json"
		});
		
		try{
			if(!res.ok){
				const response = await res.json();
				setError(response.message);
				setIsLoading(false);
			}else{
				const response = await res.json();
				setResponse(response.message);
				setIsLoading(false);
			}
		} catch(error) {
			console.log(error);
		}
	}

  return {isLoading, error, response, handleCreateUsersRequest}
}

export default useCreateUsers;