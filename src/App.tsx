import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n'
import { EntitlementProvider } from './contexts/EntitlementContext'
import { UIProvider, useUI } from './contexts/UIContext'

// Global Layout & Overlays
import { Header } from './components/layout/Header'
import { BottomNav } from './components/layout/BottomNav'
import { Footer } from './components/layout/Footer'
import { PaywallDrawer } from './components/payment/PaywallDrawer'
import { DevInspector } from './components/inspector/DevInspector'
import { CookieBar } from './components/layout/CookieBar'
import { TourChip } from './components/layout/TourChip'
import { Toaster } from './components/layout/Toaster'
import { EntryLoader } from './components/layout/EntryLoader'
import { MemoryMatch } from './components/game/MemoryMatch'

// Pages
import { Home } from './pages/Home'
import { Catalogue } from './pages/Catalogue'
import { GameDetail } from './pages/GameDetail'
import { Play } from './pages/Play'
import { Premium } from './pages/Premium'
import { Library } from './pages/Library'
import { Project } from './pages/Project'
import { TestReport } from './pages/TestReport'
import { Legal } from './pages/Legal'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

// Scroll-to-top on route change (§15)
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, search])
  return null
}

// Global modal player overlay for in-page quick play from cards (§11.4, §16)
function GlobalPlayerModal() {
  const { playerGame, closePlayer } = useUI()

  if (!playerGame) return null

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-none animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
        <MemoryMatch
          title={playerGame.titleEn}
          onClose={closePlayer}
        />
      </div>
    </div>
  )
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollToTop />
      <EntryLoader onComplete={() => {}} />

      {/* Header */}
      <Header />

      {/* Main Content View */}
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Catalogue />} />
          <Route path="/games/:slug" element={<GameDetail />} />
          <Route path="/play/:slug" element={<Play />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/library" element={<Library />} />
          <Route path="/project" element={<Project />} />
          <Route path="/test-report" element={<TestReport />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:doc" element={<Legal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Nav for Mobile */}
      <BottomNav />

      {/* Global Overlays */}
      <PaywallDrawer />
      <GlobalPlayerModal />
      <DevInspector />
      <CookieBar />
      <TourChip />
      <Toaster />
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <EntitlementProvider>
          <UIProvider>
            <MainLayout />
          </UIProvider>
        </EntitlementProvider>
      </LangProvider>
    </BrowserRouter>
  )
}

export default App
