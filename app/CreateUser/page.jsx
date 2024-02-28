import UserForm from "../(components)/UserForm/UserForm";
import { ALL_ADMINS } from "../(components)/constant";
import { requireAuthentication, requireRole } from "../api/auth/[...nextauth]/route";

const CreateUser = () => {
  return (
    <div>
      <UserForm/>
    </div>
  )
}

export default requireAuthentication(requireRole(ALL_ADMINS)(CreateUser));