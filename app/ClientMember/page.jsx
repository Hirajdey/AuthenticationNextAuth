"use client"
import { ALL_ADMINS } from "../(components)/constant";
import withAuthAndRole from "../(hoc)/withAuthAndRole";

const Member = () => {
  return (
    <div><h1>Member Client Session</h1></div>
  )
}

export default withAuthAndRole(Member, ALL_ADMINS);