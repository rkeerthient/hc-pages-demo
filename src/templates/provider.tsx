/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import Description from "../components/description";
import ProviderBio from "../components/provider-bio";
import AppointmentScheduler from "../components/appointment-scheduler";
import Favicon from "../public/yext-favicon.ico";
import "../index.css";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "c_providerBio",
      "c_specialtiesPages",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "headshot",
      "acceptingNewPatients",
      "insuranceAccepted",
      "c_medicalGroupStatus",
      "c_starRating",
      "c_numberOfReviews",
      "c_slotRow1",
      "c_slotRow2",
      "languages"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["healthcareProfessional"],
      savedFilterIds: ["1135053366"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Provider: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    c_specialtiesPages,
    geocodedCoordinate,
    services,
    c_providerBio,
    headshot,
    acceptingNewPatients,
    insuranceAccepted,
    c_medicalGroupStatus,
    c_starRating,
    c_numberOfReviews,
    c_slotRow1,
    c_slotRow2,
    languages,
  } = document;

  let schedulerDiv;
  if (acceptingNewPatients) {
    schedulerDiv = <div className="bg-gray-100 p-6"><AppointmentScheduler></AppointmentScheduler></div>
  } else {
    schedulerDiv = '';
  }
  

  return (
    <>
      <PageLayout _site={_site} c_siteLogo={_site.c_siteLogo}>
        <Banner
          name={name}
          headshot={headshot}
          c_specialtiesPages={c_specialtiesPages}
          address={address}
          c_starRating={c_starRating}
          c_numberOfReviews={c_numberOfReviews}
          c_45StarsImage={_site.c_45StarsImage}
        />
        <div className="centered-container">
          <div className="section">
            <div className="bg-gray-100 p-6 mb-10">
              <ProviderBio
                description={c_providerBio}
              ></ProviderBio>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              <div className="bg-gray-100 p-6 pb-8">
                <Description
                  name={name}
                  c_specialtiesPages={c_specialtiesPages}
                  acceptingNewPatients={acceptingNewPatients}
                  insuranceAccepted={insuranceAccepted}
                  languages={languages}
                ></Description>
              </div>
              <div className="bg-gray-100 p-6">
                <Details address={address} phone={mainPhone}></Details>
                {services && <List list={services}></List>}
              </div>
              <div className="bg-gray-100 p-6">
                {hours && <Hours title={"Office Hours"} hours={hours} />}
              </div>
              {geocodedCoordinate && (
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              )}
              {schedulerDiv}
              <div className="bg-gray-100 h-[27rem]">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/xZabpqkEARk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Provider;
