import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Hero from "./hero";
import LargeVideo from "../elements/large-video";
import FeatureColumnsGroup from "./feature-columns-group";
import FeatureRowsGroup from "./feature-rows-group";
import BottomActions from "./bottom-actions";
import TestimonialsGroup from "./testimonials-group";
import RichText from "../elements/rich-text";
import Pricing from "./pricing";
import LeadForm from "./lead-form";
import PageCountdown from "./page-countdown";

// Map sections to section components
const sectionComponents = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.rich-text": RichText,
  "sections.pricing": Pricing,
  "sections.lead-form": LeadForm,
  "sections.countdown": dynamic(() => import("./page-countdown"), {
    ssr: false,
  }),
};

// Display a section individually
const Section = ({ sectionData, global }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData} global={global} />;
};

const PreviewModeBanner = () => {
  const router = useRouter();
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`;

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  );
};

// Display the list of sections
const Sections = ({ sections, preview, global }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__component}${section.id}`}
          global={global}
        />
      ))}
    </div>
  );
};

export default Sections;
