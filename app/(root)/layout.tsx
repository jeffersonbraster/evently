import Footer from "@/components/shared/base/footer";
import Header from "@/components/shared/base/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flrx-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
