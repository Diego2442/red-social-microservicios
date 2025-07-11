
import SetAuthUser from "@/components/auth/SetAuthUser";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

import { verifySession } from "@/src/auth/dal";


export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {user} = await verifySession()

  return (
    <>

      <SetAuthUser user={user}/>

      <Header/>
      <section className='max-w-5xl mx-auto mt-20 p-3 py-10 flex justify-center'>
        {children}
      </section>

      <Footer/>
    
    </>
  );
}