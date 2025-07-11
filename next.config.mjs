/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals: 'loose',
    },
    images: {
      domains: [
        'variety.com',
        'media.cnn.com',
        'www.washingtonpost.com',
        'assets2.cbsnewsstatic.com',
        'media.defense.gov',
        'd1e00ek4ebabms.cloudfront.net'
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    }
  }
  
  export default nextConfig