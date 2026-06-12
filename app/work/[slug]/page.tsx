import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CaseStudyDetail from '@/components/case-study/CaseStudyDetail'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Alex Chen`,
    description: project.summary,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <Header />
      <main>
        <CaseStudyDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
