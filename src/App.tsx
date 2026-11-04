import { lazy } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { routes } from '@/lib/routes'
import Home from '@/pages/Home'

// Les pages autres que l'accueil sont chargées à la demande : le premier
// affichage reste léger, même en 3G.
const Services = lazy(() => import('@/pages/Services'))
const ServiceWeb = lazy(() => import('@/pages/ServiceWeb'))
const Training = lazy(() => import('@/pages/Training'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Work = lazy(() => import('@/pages/Work'))
const CaseStudy = lazy(() => import('@/pages/CaseStudy'))
const About = lazy(() => import('@/pages/About'))
const Blog = lazy(() => import('@/pages/Blog'))
const Contact = lazy(() => import('@/pages/Contact'))
const Careers = lazy(() => import('@/pages/Careers'))
const Faq = lazy(() => import('@/pages/Faq'))
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
          <Route path={routes.training} element={<Training />} />
          <Route path={routes.pricing} element={<Pricing />} />
          <Route path={routes.work} element={<Work />} />
          <Route path={routes.caseStudy} element={<CaseStudy />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.blog} element={<Blog />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.careers} element={<Careers />} />
          <Route path={routes.faq} element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
