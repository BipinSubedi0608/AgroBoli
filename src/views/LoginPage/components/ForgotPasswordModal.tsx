import Swal from "sweetalert2";
import { resetPassword } from "../../../services/firebaseAuthServices";

export async function ForgotPasswordModal() {
  const { value: email } = await Swal.fire({
    icon: "question",
    title: "Forgot your password?",
    input: "email",
    inputLabel: "Enter your email address",
    inputPlaceholder: "user@example.com",
    confirmButtonText: "Reset",
    confirmButtonColor: "#0A7123",
  });
  if (email) {
    await resetPassword({ email });
    Swal.fire({
      icon: "success",
      title: "Email Sent Successfully",
      html: `Reset email has been sent successfully to '<strong>${email}</strong>'.<br /> 
      Please check your mail and reset your password.`,
      confirmButtonColor: "#0A7123",
      timer: 5000,
      timerProgressBar: true,
    });
  }
}
