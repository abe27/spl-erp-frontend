import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "xpw-project",
      credentials: {},
      async authorize(credentials, req) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", credentials.username);
        urlencoded.append("password", credentials.password);
        var httpConfig = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
        const res = await fetch(`${process.env.API_HOST}/user/login`, httpConfig);

        if (res.status === 200) {
          const data = await res.json();
          if (data) {
            return data;
          }
        } else {
          console.dir(res)
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: "24h",
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // console.dir(user)
        return {
          ...token,
          userId: user.data.user_id.id,
          userName: user.data.user_id.username,
          email: user.data.user_id.email,
          imgUrl: user.data.user_id.avatar_url,
          isAdmin: user.data.is_admin,
          accessToken: `${user.data.jwt_type} ${user.data.jwt_token}`,
          Area: user.data.user_id.area,
          Whs: user.data.user_id.whs,
          Factory: user.data.user_id.factory,
          Position: user.data.user_id.position,
          Department: user.data.user_id.department,
          Section: user.data.user_id.section,
          PrefixName: user.data.user_id.prefix_name,
          fullName: `${user.data.user_id.firstname} ${user.data.user_id.lastname}`,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.userName = token.userName;
      session.user.email = token.email;
      session.user.imgUrl = token.imgUrl;
      session.user.isAdmin = token.isAdmin;
      session.user.accessToken = token.accessToken;
      session.user.fullName = token.fullName;
      // session.user.Area = token.Area.title;
      // session.user.Whs = token.Whs.title;
      // session.user.WhsDescription = token.Whs.description;
      // session.user.Factory = token.Factory.title;
      // session.Position = token.Position.title;
      // session.Department = token.Department.title;
      // session.Section = token.Section.title;
      // session.PrefixName = token.PrefixName.title;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);