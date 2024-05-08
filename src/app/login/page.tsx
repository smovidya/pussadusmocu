import Image from "next/image";
import AgreementDialog from "../_components/AgreementDialog";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen grid md:grid-cols-5">
      <div className="hidden md:bg-yellow01 md:flex col-span-3 items-center justify-center">
        <Image
          src={"/picture/yellowBox.svg"}
          alt="iconBox"
          width={200}
          height={200}
        />
      </div>
      <div className=" bg-yellow01 md:bg-grey02 md:col-span-2 p-5 md:shadow-inner flex justify-center">
        <div className="fixed top-5 right-5">
          <Image
            src={"/picture/logoSmo.svg"}
            alt="logoSmo"
            width={80}
            height={71}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/picture/yellowBox.svg"}
            alt="iconBox"
            width={108}
            height={108}
            className="md:hidden "
          />
          <div className="font-noto-sans text-H2 md:text-H1 font-bold drop-shadow-3xl ">
            ระบบพัสดุ
          </div>
          <div className="font-noto-sans text-subHead2 md:text-subHead1 font-bold mb-28">
            สโมสรนิสิตคณะวิทยาศาสตร์
          </div>
          <a href="https://account.it.chula.ac.th/html/login.html?serviceName=PUSSADU-SUCU&service=https://pussaduvidyacu.vercel.app/api/auth/callback">
            <button
              type="button"
              data-modal-target="default-model"
              data-modal-toggle="default-modal"
              className=" block font-noto-sans text-bodyEngBold1 font-bold py-2 px-6 bg-black text-white rounded-lg w-72 shadow-sm shadow-black"
            >
              LOGIN CHULA SSO
            </button>
          </a>
          <AgreementDialog />
          <div className="h-36 md:h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;