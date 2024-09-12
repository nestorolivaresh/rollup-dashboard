import { Link } from 'next-view-transitions'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Welcome to the rollup dashboard!</h1>
      <p className="text-sm sm:text-base md:text-lg text-center max-w-md mx-auto mb-4">
        If you want to see some info about certain rollup, click{" "}
        <Link
          href="/rollups/arb-blueberry"
          className="text-blue-500 hover:text-blue-700"
        >
          here
        </Link>
        .
      </p>
      <span className="text-xs sm:text-sm text-gray-500">Built by Nest</span>
    </main>
  );
}