const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/gateway/:path*',
                destination: 'https://gateway.ai.cloudflare.com/v1/:path*',
            },
        ];
    },
};

export default nextConfig;
