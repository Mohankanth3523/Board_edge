import type { Route } from "./+types/home";
import { SiteLayout } from "~/components/layout/SiteLayout";
import { AboutSection } from "~/components/sections/home/AboutSection";
import { AssemblyServices } from "~/components/sections/home/AssemblyServices";
import { AudiencePathways } from "~/components/sections/home/AudiencePathways";
import { EngineeringWorkflow } from "~/components/sections/home/EngineeringWorkflow";
import { EnquiryCTA } from "~/components/sections/home/EnquiryCTA";
import { HardwareRD } from "~/components/sections/home/HardwareRD";
import { Hero } from "~/components/sections/home/Hero";
import { ProjectGallery } from "~/components/sections/home/ProjectGallery";
import { ServiceCoverage } from "~/components/sections/home/ServiceCoverage";
import { StudentProjects } from "~/components/sections/home/StudentProjects";
import { WhyChooseUs } from "~/components/sections/home/WhyChooseUs";
import { site } from "~/config/site";

// Full SEO component (canonical, Open Graph, JSON-LD) arrives in Phase 7.
export function meta(_: Route.MetaArgs) {
  return [
    { title: `Hardware R&D, PCB Design & Assembly in Bengaluru and Tamil Nadu | ${site.name}` },
    {
      name: "description",
      content:
        "Electronics engineering, hardware R&D, PCB design, PCB assembly, rework, testing, wire harness and panel assembly — plus final-year project support. Bengaluru and Tamil Nadu.",
    },
  ];
}

/** Section order follows the homepage brief (sections 1–13). */
export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <AudiencePathways />
      <AboutSection />
      <HardwareRD />
      <AssemblyServices />
      <StudentProjects />
      <EngineeringWorkflow />
      <WhyChooseUs />
      <ProjectGallery />
      <ServiceCoverage />
      <EnquiryCTA />
    </SiteLayout>
  );
}
