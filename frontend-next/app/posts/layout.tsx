import SetAuthUser from "@/components/auth/SetAuthUser";
import CreateForm from "@/components/posts/CreateForm";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

import { verifySession } from "@/src/auth/dal";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <>
      <SetAuthUser user={user} />

      <Header />
      <section className="max-w-5xl mx-auto mt-20 px-4 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Columna izquierda: el formulario fijo */}
          <div className="md:w-1/3 w-full">
            <div className="md:sticky top-24">
              {" "}
              {/* Sticky solo en md+ */}
              <h2 className="text-xl font-semibold mb-4">Agregar Post</h2>
              <CreateForm/>
            </div>
          </div>

          {/* Columna derecha: contenido scrollable */}
          <div className="md:w-2/3 w-full">{children}</div>
        </div>
      </section>

      <Footer />
    </>
  );
}
