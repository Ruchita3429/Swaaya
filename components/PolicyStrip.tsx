import Container from './Container';

const policies = [
  {
    id: 1,
    title: 'Easy Exchange Policy',
    subtitle: 'Hassle-free exchanges within 7 days',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: '7 Days Return Policy',
    subtitle: 'Full refund on returns within 7 days',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Best Customer Support',
    subtitle: '24/7 dedicated support team',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

export default function PolicyStrip() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="text-[#111827] mb-4">{policy.icon}</div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-[#111827] mb-2">
                {policy.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm md:text-base text-gray-500">
                {policy.subtitle}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


