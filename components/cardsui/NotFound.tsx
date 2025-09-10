import Link from "next/link";
import Container from "./Container";

function NotFound(){
  return (
    <main className="py-24">
      <Container className="text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700">Back to Home</Link>
      </Container>
    </main>
  );
}

export default NotFound;
