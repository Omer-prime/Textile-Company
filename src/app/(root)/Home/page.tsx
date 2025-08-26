import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import TrendingProductsSection from '../components/TrendingProductsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import HowItWorksSection from '../components/HowItWorksSection'

const Homepage = () => {
    return (
        <>
            <HeroSection />

            <FeaturesSection />

            <TrendingProductsSection />
            <TestimonialsSection />
            <HowItWorksSection />
        </>
    )
}

export default Homepage