/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      }
    ]
  }
};

module.exports = nextConfig;
