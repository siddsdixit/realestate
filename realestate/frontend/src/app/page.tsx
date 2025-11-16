import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Image */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50/20 via-white to-white dark:from-gray-900 dark:via-gray-800">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Beautiful home"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-500/80 to-indigo-600/90 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 sm:pt-16 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl drop-shadow-lg">
              Find Your Next
              <span className="block text-blue-200"> Investment Property</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-blue-50 drop-shadow-md">
              Discover premium real estate investments with powerful search tools and detailed analytics. 
              Find properties that match your investment criteria in seconds.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-xl transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-2xl"
              >
                Start Searching
              </Link>
              <Link
                href="#features"
                className="text-lg font-semibold leading-6 text-white hover:text-blue-200 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Properties Available</dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                50+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Cities Covered</dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                10+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">Average ROI</dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                8.5%
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Powerful Tools</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Everything you need to find the perfect investment
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our platform provides comprehensive search tools and detailed property analytics to help you make informed investment decisions.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 transition-all hover:shadow-2xl hover:scale-105 dark:bg-gray-700 dark:ring-white/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                  </div>
                  Advanced Filters
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Filter by price range, bedrooms, bathrooms, property type, and zip code. Find exactly what you're looking for with precision.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 transition-all hover:shadow-2xl hover:scale-105 dark:bg-gray-700 dark:ring-white/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  Detailed Listings
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    View comprehensive property information including high-quality photos, location maps, square footage, and investment metrics.
                  </p>
                </dd>
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 transition-all hover:shadow-2xl hover:scale-105 dark:bg-gray-700 dark:ring-white/10">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  </div>
                  Map Integration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Visualize properties on interactive maps to understand neighborhoods, proximity to amenities, and market trends.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Ready to find your next investment?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Join thousands of investors who use our platform to discover profitable real estate opportunities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-2xl"
              >
                Get Started
              </Link>
              <Link
                href="/dashboard"
                className="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary transition-colors"
              >
                Browse Properties <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
