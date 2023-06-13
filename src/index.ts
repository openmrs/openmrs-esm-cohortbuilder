import { getAsyncLifecycle } from "@openmrs/esm-framework";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
  reportingrest: "^1.0.0",
  reporting: "^1.0.0",
};

function setupOpenMRS() {
  const moduleName = "@openmrs/esm-cohort-builder";

  const options = {
    featureName: "cohort-builder",
    moduleName,
  };

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./cohort-builder"), options),
        route: "cohort-builder",
      },
    ],
    extensions: [
      {
        id: "system-administration-cohort-builder-card-link",
        slot: "system-admin-page-card-link-slot",
        load: getAsyncLifecycle(
          () => import("./cohort-builder-admin-link.component"),
          options
        ),
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
