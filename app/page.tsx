import { EnhancedHero } from "@/components/enhanced-hero"
import { About } from "@/components/about"
import { EnhancedProjects } from "@/components/enhanced-projects"
import { EnhancedSkills } from "@/components/enhanced-skills"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { FloatingBlob } from "@/components/floating-blob"
import { PageTransition } from "@/components/page-transition"
import { CrtGlitch } from "@/components/crt-glitch"
import { OptimizedParallax } from "@/components/optimized-parallax"
import { OptimizedGenerativeArt } from "@/components/optimized-generative-art"
import { UltraSmoothCursor } from "@/components/ultra-smooth-cursor"
import { CssCursorTrail } from "@/components/css-cursor-trail"

export default function Home() {
  return (
    <CrtGlitch intensity={0.1}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        <OptimizedGenerativeArt />
        <OptimizedParallax />
        <FloatingBlob />
        <UltraSmoothCursor />
        <CssCursorTrail />
        <Navigation />
        <PageTransition>
          <EnhancedHero />
          <About />
          <EnhancedSkills />
          <EnhancedProjects />
          <Education />
          <Contact />
        </PageTransition>
      </div>
    </CrtGlitch>
  )
}
