import Container from "@/components/Container";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <section>
        <Container>
          <h1 className="text-4xl font-bold mb-4">Welcome to Swaaya</h1>
          <p className="text-gray-500">
            Premium fashion e-commerce layout system
          </p>
        </Container>
      </section>
    </div>
  );
}
