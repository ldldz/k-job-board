export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-100">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2024 CareerLib. All rights reserved.</p>
          <div className="mt-2">
            <a
              href="https://forms.gle/q5Ng5J2bjZSN3bjL9"
              className="mx-2 text-gray-600 hover:text-gray-900"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
