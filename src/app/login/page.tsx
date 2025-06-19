import Image from "next/image";
import AgreementDialog from "../../components/shared/AgreementDialog";

const LoginPage = () => {
  const getURLByEnv = () => {
    const env = process.env.NODE_ENV;
    if (env === "development") {
      return "/users/home";
    }
    return "https://account.it.chula.ac.th/html/login.html?serviceName=PUSSADU-SUCU&service=https://pussadusmocu.vercel.app/api/auth";
  };

  // Version and deployment date
  const version = "1.4.0";
  const deploymentDate = "Dec 11, 2024";

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
      <div className="bg-yellow01 md:bg-grey02 flex justify-center p-5 md:col-span-2 md:shadow-inner">
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
            className="md:hidden"
          />
          <div className="drop-shadow-3xl font-noto-sans text-H2 md:text-H1 font-bold">
            ระบบพัสดุ
          </div>
          <div className="font-noto-sans text-subHead2 md:text-subHead1 mb-28 font-bold">
            สโมสรนิสิตคณะวิทยาศาสตร์
          </div>
          <a href={getURLByEnv()}>
            <button
              name="log-in-button"
              type="button"
              data-modal-target="default-model"
              data-modal-toggle="default-modal"
              className="font-noto-sans text-bodyEngBold1 block w-72 rounded-lg bg-black px-6 py-2 font-bold text-white shadow-sm shadow-black"
            >
              LOGIN CHULA SSO
            </button>
          </a>
          <AgreementDialog />
          <div className="h-36 md:h-16"></div>
          {/* Version and deployment date */}
          <div className="absolute right-5 bottom-5 text-sm text-gray-500">
            Version: {version} | Deployed: {deploymentDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
