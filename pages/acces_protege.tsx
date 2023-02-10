// pages/protected-page.js
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import "./Components/File";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export default function ProtectedPage({
  user,
  data,
}: {
  user: User;
  data: any;
}) {
  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/profile">getServerSideProps</Link>]
      </p>

      <div className="container">
        <div className="left">
          <AddImage />
        </div>
        <div className="right">Right</div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Run queries with RLS on the server
  const { data } = await supabase.from("users").select("*");

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};
