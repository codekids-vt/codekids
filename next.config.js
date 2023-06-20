/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
        // permanent: true
      }
    ];
  }
}

module.exports = nextConfig
