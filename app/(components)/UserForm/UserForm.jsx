'use client'

import { useEffect, useState } from "react";
import AppInput from "../utils/AppInput/AppInput";
import useCreateUsers from "../hooks/useCreateUsers";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const route = useRouter();
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const {response, error, isLoading, handleCreateUsersRequest} = useCreateUsers();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    handleCreateUsersRequest({
      formData
    });
  };

  useEffect(() => {
    if(response){
      alert(response);
      route.refresh();
      route.push('/');
    }
    if(error){
      alert(error);
    }
  },[response, error, isLoading]);

  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1>Create New User</h1>
        <AppInput 
          name={'name'}
          type={'text'}
          labelText={"Full Name"}
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
        <AppInput 
          name={'email'}
          type={'email'}
          labelText={"Email ID"}
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        <AppInput 
          name={'password'}
          type={'password'}
          labelText={"Password"}
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="bg-blue-300 hover:bg-blue-100">Create User</button>
      </form>
      <p className="text-red-500">{formError}</p>
    </div>
  )
}

export default UserForm;