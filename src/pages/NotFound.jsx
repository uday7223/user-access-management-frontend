const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-white/80">Oops! Page Not Found</p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-white/20 hover:bg-white/40 rounded-md backdrop-blur-md transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
