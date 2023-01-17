/* eslint-disable react-hooks/exhaustive-deps */
import { Header } from "@/components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOut = () => {
  const router = useRouter()
  const { data: session } = useSession();

  const UserLogOut = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", session.user.accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/auth/me`, requestOptions);
    if (res.ok) {
      signOut();
      router.push("/auth")
    }
  };

  useEffect(() => {
    if (session) {
      UserLogOut();
    }
  }, [session]);

  return (
    <>
      <Header title="ออกจากระบบ" description="กำลังออกจากระบบ" />
    </>
  );
};

export default SignOut;
