/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    apiKey: "AIzaSyDoVePVQaiIv5AbConx1890fkRKe5PWlAM",
    authDomain: "half-caf-blog-180d2.firebaseapp.com",
    projectId: "half-caf-blog-180d2",
    storageBucket: "half-caf-blog-180d2.appspot.com",
    messagingSenderId: "66525290822",
    appId: "1:66525290822:web:d535eda058428c69174547",
    measurementId: "G-HS6TZC1WRY"
  }
}

module.exports = {
  nextConfig,
  images: {
    domains: ['res.cloudinary.com', 'cdn.sanity.io'],
  },
}


