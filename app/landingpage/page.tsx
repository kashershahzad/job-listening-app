import React from 'react'
import Hero from '@/app/components/landing/hero'
import Navbar from '@/app/components/navbar/Navbar'
import Service from "@/app/components/landing/Service"
import Choose from "@/app/components/landing/Chooseus"
import Jobs from "@/app/components/landing/Jobs"
import GetStartes from "@/app/components/landing/GetStrated"
import Footer from "@/app/components/landing/Footer"

const page = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Service />
            <Jobs />
            <Choose />
            <GetStartes />
            <Footer />
        </div>
    )
}

export default page