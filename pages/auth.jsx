/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";


const AuthPage = () => {
  const toast = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set("username", data.get("username"));
    data.set("password", data.get("password"));
    // console.dir(`USERNAME: ${data.get('username')} PASSWORD: ${data.get('password')}`)
    const res = await signIn("credentials", {
      redirect: false,
      username: data.get("username"),
      password: data.get("password"),
    });

    if (!res.ok) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: res.error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      router.push("/auth")
    }

    if (res.ok) {
      toast({
        title: `สวัสดี ${data.get("username")}`,
        description: `ยินดีต้อนรับเข้าสู่ระบบ ${process.env.APP_NAME}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      router.push("/")
    }
  };
  return (
    <>
      <Header title="เข้าสู่ระบบ" description="ยินดีต้อนรับเข้าสู่ระบบ" />
      <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  ชื่อผู้ใช้งาน
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="ชื่อผู้ใช้งาน"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberme"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  จำข้อมูลนี้ไว้
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forget">
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  คุณลืมรหัสผ่านใช่หรือไม่?
                </span>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
