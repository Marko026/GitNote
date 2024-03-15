/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/register',
                permanent: false,
            },
        ]
    },
};
export default nextConfig;
