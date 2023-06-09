import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Database } from "../db_types";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  console.log(process.env);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <button
        onClick={async () => {
          await supabaseClient.auth.signOut();
          router.push("/");
        }}
      >
        Logout
      </button>

      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default App;
