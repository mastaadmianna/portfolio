import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CursorFollower from '@/components/ui/CursorFollower'
import CaseStudyHero from '@/components/case-study/CaseStudyHero'
import ProblemStatement from '@/components/case-study/ProblemStatement'
import Goals from '@/components/case-study/Goals'
import Research from '@/components/case-study/Research'
import DesignProcess from '@/components/case-study/DesignProcess'
import KeyFeatures from '@/components/case-study/KeyFeatures'
import DesignDecisions from '@/components/case-study/DesignDecisions'
import FinalProduct from '@/components/case-study/FinalProduct'
import Impact from '@/components/case-study/Impact'
import Learnings from '@/components/case-study/Learnings'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Alex Chen`,
    description: project.summary,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  return (
    <>
      <CursorFollower />
      <Header />
      <main>
        <CaseStudyHero project={project} />
        <ProblemStatement project={project} />
        <Goals project={project} />
        <Research project={project} />
        <DesignProcess project={project} />
        <KeyFeatures project={project} />
        <DesignDecisions project={project} />
        <FinalProduct project={project} />
        <Impact project={project} />
        <Learnings project={project} />
      </main>
      <Footer />
    </>
  )
}
