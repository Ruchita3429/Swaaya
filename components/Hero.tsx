import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full bg-[#FAF9F6]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[500px] md:min-h-[600px]">
        {/* Left Side - Content */}
        <div className="bg-[#F3F4F6] flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 md:py-16 order-2 md:order-1">
          <div className="w-full max-w-md">
            {/* Decorative Line */}
            <div className="w-10 h-0.5 bg-[#2C2C2C] mb-6"></div>
            
            {/* Small Text */}
            <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-4 font-semibold">
              OUR BESTSELLERS
            </p>
            
            {/* Large Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-[#2C2C2C] mb-8 leading-tight">
              Latest Arrivals
            </h1>
            
            {/* Button */}
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-12 h-0.5 bg-[#2C2C2C] transition-all duration-200 group-hover:w-16"></div>
              <span className="uppercase text-sm font-semibold text-[#2C2C2C] tracking-wider px-6 py-3 border-2 border-[#2C2C2C] rounded-lg hover:bg-[#2C2C2C] hover:text-white transition-all duration-200">
                SHOP NOW
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full min-h-[400px] md:min-h-[600px] order-1 md:order-2">
          <div className="relative w-full h-full bg-gradient-to-br from-[#FFC0CB] to-[#FFB6C1]">
            {/* Placeholder for image - replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg font-semibold">Hero Image</div>
            </div>
            {/* Uncomment and use when you have an image:
            <Image
              src="/hero-image.jpg"
              alt="Latest Arrivals"
              fill
              className="object-cover"
              priority
            />
            */}
          </div>
        </div>
      </div>
    </section>
  );
}