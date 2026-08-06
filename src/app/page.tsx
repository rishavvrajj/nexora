import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div
      className="patrick-hand-regular min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <main className="flex min-h-screen w-full flex-col">
        <NavBar />
      </main>
    </div>
  );
}