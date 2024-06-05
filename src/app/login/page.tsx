import Image from "next/image";
import AgreementDialog from "../_components/AgreementDialog";

const LoginPage = () => {
  return (
    <div className="grid h-screen w-screen md:grid-cols-5">
      <div className="md:bg-yellow01 col-span-3 hidden items-center justify-center md:flex">
        <Image
          src={"/picture/yellowBox.svg"}
          alt="iconBox"
          width={200}
          height={200}
        />
      </div>
      <div className=" bg-yellow01 md:bg-grey02 flex justify-center p-5 md:col-span-2 md:shadow-inner">
        <div className="fixed right-5 top-5">
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
          <div className="drop-shadow-3xl font-noto-sans text-H2 md:text-H1 font-bold ">
            ระบบพัสดุ
          </div>
          <div className="font-noto-sans text-subHead2 md:text-subHead1 mb-28 font-bold">
            สโมสรนิสิตคณะวิทยาศาสตร์
          </div>
          <a href="https://account.it.chula.ac.th/html/login.html?serviceName=PUSSADU-SUCU&service=https://pussaduvidyacu.vercel.app/api/auth/callback">
            <button
              type="button"
              data-modal-target="default-model"
              data-modal-toggle="default-modal"
              className=" font-noto-sans text-bodyEngBold1 block w-72 rounded-lg bg-black px-6 py-2 font-bold text-white shadow-sm shadow-black"
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
