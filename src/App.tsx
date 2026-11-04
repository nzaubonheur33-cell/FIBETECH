import { lazy } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { routes } from '@/lib/routes'
import Home from '@/pages/Home'

// Les pages autres que l'accueil sont chargées à la demande : le premier
// affichage reste léger, même en 3G.
const Services = lazy(() => import('@/pages/Services'))
const ServiceWeb = lazy(() => import('@/pages/ServiceWeb'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Training = lazy(() => import('@/pages/Training'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Work = lazy(() => import('@/pages/Work'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const About = lazy(() => import('@/pages/About'))
const Blog = lazy(() => import('@/pages/Blog'))
const Contact = lazy(() => import('@/pages/Contact'))
const Faq = lazy(() => import('@/pages/Faq'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.services} element={<Services />} />
          <Route path={routes.web} element={<ServiceWeb />} />
          <Route path={routes.reseau} element={<ServiceDetail kind="reseau" />} />
          <Route path={routes.ia} element={<ServiceDetail kind="ia" />} />
          <Route path={routes.training} element={<Training />} />
          <Route path={routes.pricing} element={<Pricing />} />
          <Route path={routes.work} element={<Work />} />
          <Route path="/realisations/:slug" element={<ProjectDetail />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.blog} element={<Blog />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.faq} element={<Faq />} />
          <Route path={routes.legal} element={<LegalPage kind="legal" />} />
          <Route path={routes.privacy} element={<LegalPage kind="privacy" />} />
          <Route path={routes.terms} element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
