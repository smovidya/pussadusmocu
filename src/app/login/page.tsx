import Image from "next/image";
import AgreementDialog from "../_components/shared/AgreementDialog";

const LoginPage = () => {
  const getURLByEnv = () => {
    const env = process.env.NODE_ENV;
    if (env === "development") {
      return "/users/home";
    }
    return "https://account.it.chula.ac.th/html/login.html?serviceName=PUSSADU-SUCU&service=https://pussadusmocu.vercel.app/api/auth";
  };

  // Version and deployment date
  const version = "1.3.1";
  const deploymentDate = "Sep 5, 2024";

  return (
    <div className="grid h-screen w-screen md:grid-cols-5">
      <div className="col-span-3 hidden items-center justify-center md:flex md:bg-yellow01">
        <Image
          src={"/picture/yellowBox.svg"}
          alt="iconBox"
          width={200}
          height={200}
        />
      </div>
      <div className=" flex justify-center bg-yellow01 p-5 md:col-span-2 md:bg-grey02 md:shadow-inner">
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
          <div className="drop-shadow-3xl font-noto-sans text-H2 font-bold md:text-H1">
            ระบบพัสดุ
          </div>
          <div className="mb-28 font-noto-sans text-subHead2 font-bold md:text-subHead1">
            สโมสรนิสิตคณะวิทยาศาสตร์
          </div>
          <a href={getURLByEnv()}>
            <button
              name="log-in-button"
              type="button"
              data-modal-target="default-model"
              data-modal-toggle="default-modal"
              className=" block w-72 rounded-lg bg-black px-6 py-2 font-noto-sans text-bodyEngBold1 font-bold text-white shadow-sm shadow-black"
            >
              LOGIN CHULA SSO
            </button>
          </a>
          <AgreementDialog />
          <div className="h-36 md:h-16"></div>
          {/* Version and deployment date */}
          <div className="absolute bottom-5 right-5 text-sm text-gray-500">
            Version: {version} | Deployed: {deploymentDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
