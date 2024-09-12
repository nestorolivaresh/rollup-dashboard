export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to the rollup dashboard!</h1>
      <p className="text-lg">
        If you want to see some info about certain rollup, click{" "}
        <a
          href="/rollups/arb-blueberry"
          className="text-blue-500 hover:text-blue-700"
        >
          here
        </a>
        .
      </p>
      <span className="text-sm text-gray-500">Built by Nest</span>
    </main>
  );
}
