/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cojgljiqpitvuwdvnmgf.supabase.co",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

module.exports = nextConfig;
