import { FaExclamationTriangle } from "react-icons/fa";


const ErrorMessage = ({ message }: { message: string | null }) => {
  return <div className=" mb-6
  flex justify-center items-center 
  text-xl font-bold text-custom-point"
  >
    {message && <FaExclamationTriangle />}
    <p>{message}</p>
  </div>
}

export default ErrorMessage;