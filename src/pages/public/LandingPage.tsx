import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components/Hero";
import { PhilosophySection } from "../../components/PhilosophySection";
import { ProductShowcaseSection } from "../../components/ProductShowcaseSection";
import { ProcessSection } from "../../components/ProcessSection";
import { IndicatorDetailsSection } from "../../components/IndicatorDetailsSection";
import { SessionSection } from "../../components/SessionSection";
import { TrustSection } from "../../components/TrustSection";
import { PricingAccessSection } from "../../components/PricingAccessSection";
import { FaqSection } from "../../components/FaqSection";
import { FinalCtaSection } from "../../components/FinalCtaSection";
import { Footer } from "../../components/Footer";
import { Modal, ModalType } from "../../components/Modal";
import { GridBackground } from "../../components/ui/GridBackground";
import { useRouter } from "../../router/Router";
import { ROUTES } from "../../router/routes";

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  return (
    <>
      {/* Environmental Coordinate Grid + Ambient Radial Center */}
      <GridBackground />

      {/* 01: Refined Navigation */}
      <Navbar
        onOpenLogin={() => navigate(ROUTES.LOGIN)}
        onOpenIndicator={() => navigate(ROUTES.CHECKOUT)}
      />

      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        {/* 02: HERO — Trade with clarity */}
        <Hero
          onOpenIndicator={() => navigate(ROUTES.CHECKOUT)}
          onOpenSession={() => navigate(ROUTES.SESSION)}
        />

        {/* 03: PROBLEM / PHILOSOPHY */}
        <PhilosophySection />

        {/* 04: PRODUCT SHOWCASE — Interactive Indicator Artifact */}
        <ProductShowcaseSection onExploreClick={() => navigate(ROUTES.CHECKOUT)} />

        {/* 05: WORKFLOW — Structured 4-stage process */}
        <ProcessSection />

        {/* 06: INDICATOR DETAILS — 3 Capabilities with Visual Artifacts */}
        <IndicatorDetailsSection onExploreClick={() => navigate(ROUTES.INDICATOR)} />

        {/* 07: 3-DAY SESSION — Editorial Curriculum */}
        <SessionSection onOpenSession={() => navigate(ROUTES.SESSION)} />

        {/* 08: TRUST / SOCIAL PROOF PLACEHOLDER — Authentic integrity */}
        <TrustSection />

        {/* 09: PRODUCT ACCESS / PRICING — Clear tiers with backend placeholders */}
        <PricingAccessSection
          onOpenIndicator={() => navigate(ROUTES.CHECKOUT)}
          onOpenSession={() => navigate(ROUTES.SESSION)}
        />

        {/* 10: FAQ — Compact 6 questions */}
        <FaqSection onOpenSupport={() => openModal("support")} />

        {/* 11: FINAL CTA — High-impact editorial closing */}
        <FinalCtaSection
          onExploreClick={() => navigate(ROUTES.CHECKOUT)}
          onSessionClick={() => navigate(ROUTES.SESSION)}
        />
      </main>

      {/* 08: Premium Editorial Footer */}
      <Footer
        onOpenLogin={() => navigate(ROUTES.LOGIN)}
        onOpenSupport={() => openModal("support")}
        onShowToast={showToast}
      />

      {/* Action Dialogs */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        onClose={closeModal}
        onSuccess={showToast}
      />

      {/* Global Status Toast */}
      {toastMessage && (
        <div className="toast-notice show" id="global-toast" role="status">
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
