import { useLocation } from "react-router";
import type { Route } from "./+types/coming-soon";
import { SiteLayout } from "~/components/layout/SiteLayout";
import { Breadcrumbs, type Crumb } from "~/components/ui/Breadcrumbs";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Section";
import { site } from "~/config/site";
import { findPage } from "~/content/pages";

/**
 * Temporary template for inner pages scheduled for Phase 5. Keeps every
 * homepage link working; excluded from search engines (noindex).
 */
export function meta({ location }: Route.MetaArgs) {
  const page = findPage(location.pathname);
  return [{ title: `${page?.title ?? "Page"} | ${site.name}` }, { name: "robots", content: "noindex" }];
}

export default function ComingSoon() {
  const { pathname } = useLocation();
  const page = findPage(pathname);
  const title = page?.title ?? "Page";
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...(page?.parent ? [page.parent] : []), { label: title }];
  const isStudent = page?.group === "students" || pathname.includes("student");

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-drawing-grid" />
        <Container className="relative py-16 sm:py-24">
          <Breadcrumbs dark items={crumbs} />
          <h1 className="mt-8 max-w-3xl text-h1 text-white">{title}</h1>
          <p className="mt-5 max-w-xl text-lead text-mist">
            This page is being prepared. In the meantime, tell us about your requirement and we will respond with next steps.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to={isStudent ? "/contact/student-enquiry" : "/contact/business-enquiry"} size="lg" arrow>
              {isStudent ? "Student enquiry" : "Business enquiry"}
            </ButtonLink>
            <ButtonLink to="/" size="lg" variant="secondary-dark">
              Back to homepage
            </ButtonLink>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
