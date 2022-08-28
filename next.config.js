/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
// module.exports = {
//   images:{
//     domains: ['raw.githubusercontent.com'],
//     domains: ['res.githubusercontent.com'],
//   }
// }

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com', 'res.cloudinary.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}