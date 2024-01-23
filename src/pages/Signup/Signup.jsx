// Signup.js
import AuthForm from "../../components/AuthForm";
import './Signup.css';

const Signup = () => {
  const formFields = [
    { label: "Your Name", placeholder: "Choga Tafadzwa" },
    { label: "Email", placeholder: "choga@gmail.com" },
    { label: "Password", placeholder: "*******" },
  ];

  return (
    <AuthForm
      title="Create an Account"
      buttonText="GET STARTED"
      formFields={formFields}
      btnTitle='Sign Up'
      question='Already have an account?'
    />
  );
};

export default Signup;
