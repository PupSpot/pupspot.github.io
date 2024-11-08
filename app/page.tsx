import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./components/ui/animated-modal";
import LoginBtn from "./components/AuthComp/LoginComp";
import RegisterBtn from "./components/AuthComp/RegisComp";
import ProfilePage from "./components/UserComp/Profile";
import MapComponent from "./components/UserComp/HomePage";
import AddyourPet from "./components/UserComp/AddyourPet";
// import HomePage from "./components/UserComp/HomePage";

export default function Home() {
  return (
    <div className="">


      <LoginBtn/>
      <RegisterBtn/>
      <ProfilePage/>
      <MapComponent/>
      <AddyourPet/>
    </div>
  );
}
