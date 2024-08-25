import { useRecoilState, useRecoilValue } from "recoil";
import { generate_message, message, message_status } from "../store/store";
import { useState, useEffect } from "react";

export default function WarningMessage() {
  const [messageBackground, setMessagebackground] =
    useRecoilState(message_status);
  const messageVisibility = useRecoilValue(generate_message);
  const messageValue = useRecoilValue(message);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (messageVisibility) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setMessagebackground(false);
      }, 3000); // Duration the message will be visible

      return () => clearTimeout(timer); // Cleanup on unmount or when messageVisibility changes
    }
  }, [messageVisibility]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`${
          messageBackground ? "bg-green-500" : "bg-red-500"
        } rounded-md p-5 text-white text-sm md:text-lg md:font-bold`}
      >
        {messageValue}
      </div>
    </div>
  );
}
