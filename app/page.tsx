import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./components/ui/animated-modal";
import LoginBtn from "./components/ui/AuthComp/LoginComp";
import RegisterBtn from "./components/ui/AuthComp/RegisComp";
export default function Home() {
  return (
    <div className="">


      <LoginBtn/>
      <RegisterBtn/>

    </div>
  );
}
