import { ALL_ADMINS } from "../(components)/constant";
import { requireAuthentication, requireRole } from "../api/auth/[...nextauth]/route";

const CreateUser = () => {
  return (
    <div><h1>Only Admins & Super Admins!</h1></div>
  )
}

export default requireAuthentication(requireRole(ALL_ADMINS)(CreateUser));