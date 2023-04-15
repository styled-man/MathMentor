/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "images.freeimages.com", "math-mentor.s3.amazonaws.com"],
  },
}

module.exports = nextConfig