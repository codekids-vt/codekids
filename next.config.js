/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
        // permanent: true
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
        // permanent: true
      }
    ];
  }
}

module.exports = nextConfig
