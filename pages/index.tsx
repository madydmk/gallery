import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../db_types";
import AddImage from "./Components/File";
const LoginPage: NextPage = () => {
  const { isLoading, session, error } = useSessionContext();
  const user = useUser();
  const supabaseClient = useSupabaseClient<Database>();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("users").select("*").single();
      setData(data);
    }

    if (user) loadData();
  }, [user, supabaseClient]);

  if (!session)
    return (
      <>
        {error && <p>{error.message}</p>}
        {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
        <button
          onClick={() => {
            supabaseClient.auth.signInWithOAuth({
              provider: "github",
              options: { scopes: "repo", redirectTo: "http://localhost:3000" },
            });
          }}
        >
          Login with github
        </button>
        <Auth
          redirectTo="http://localhost:3000"
          appearance={{ theme: ThemeSupa }}
          // view="update_password"
          supabaseClient={supabaseClient}
          providers={["google", "github"]}
          // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
          socialLayout="horizontal"
        />
      </>
    );

  return (
    <>
      <p>
        [<Link href="/profile">Mon profil</Link>] | [
        <Link href="/protected-page">server-side RLS</Link>] |{" "}
        <button
          onClick={() =>
            supabaseClient.auth.updateUser({ data: { test1: "updated" } })
          }
        >
          Update user metadata
        </button>
        <button onClick={() => supabaseClient.auth.refreshSession()}>
          Refresh session
        </button>
      </p>
      <br />
      <AddImage />
    </>
  );
};

export default LoginPage;
