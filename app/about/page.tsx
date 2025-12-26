import Image from 'next/image';
import Container from '@/components/Container';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image (30%) */}
            <div className="lg:col-span-3">
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src="/about-image.jpg"
                  alt="About Us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
            </div>

            {/* Right Side - Content (70%) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-thin uppercase tracking-wider text-[#111827]">
                  ABOUT US —
                </h1>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-base md:text-lg">
                  Forever was born out of a passion for innovation and a desire to revolutionize 
                  the way people shop online. Our journey began with a simple idea: to provide a 
                  platform where customers can easily discover, explore, and purchase a wide range 
                  of products from the comfort of their homes.
                </p>

                <p className="text-base md:text-lg">
                  Since our inception, we've worked tirelessly to curate a diverse selection of 
                  high-quality products that cater to every taste and preference. From fashion and 
                  beauty to electronics and home essentials, we offer an extensive collection sourced 
                  from trusted brands and suppliers.
                </p>

                <div className="pt-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-4">
                    Our Mission
                  </h2>
                  <p className="text-base md:text-lg">
                    Our mission at Forever is to empower customers with choice, convenience, and 
                    confidence. We're dedicated to providing a seamless shopping experience that 
                    exceeds expectations, from browsing and ordering to delivery and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <Container>
          {/* Header */}
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase tracking-wider text-[#111827]">
              WHY CHOOSE US —
            </h2>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Card 1: Quality Assurance */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#111827] mb-4">
                Quality Assurance:
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                We meticulously select and vet each product to ensure it meets our stringent quality standards.
              </p>
            </div>

            {/* Card 2: Convenience */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#111827] mb-4">
                Convenience:
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
              </p>
            </div>

            {/* Card 3: Exceptional Customer Service */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#111827] mb-4">
                Exceptional Customer Service:
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

