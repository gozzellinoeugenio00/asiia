import { Phone } from "lucide-react";

export const PhoneButton = ({
  phoneNumber = "+393384919351",
  bottom = "50px",
  right = "50px",
  color = "#007bff",
}) => {
  return (
    <a
      href={`tel:${phoneNumber}`}
      style={{
        position: "fixed",
        bottom: bottom,
        right: right,
        backgroundColor: color,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        zIndex: 9999,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      aria-label="Chiama ora"
    >
      <Phone />
    </a>
  );
};

export default PhoneButton;
