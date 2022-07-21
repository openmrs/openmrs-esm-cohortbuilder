import { openmrsFetch } from "@openmrs/esm-framework";
import useSWRImmutable from "swr/immutable";

import { DropdownValue, Response } from "../../types";

/**
 * @returns Locations
 */
export const useForms = () => {
  const { data, error } = useSWRImmutable<{
    data: { results: Response[] };
  }>("/ws/rest/v1/form", openmrsFetch);

  const forms: DropdownValue[] = [];
  data?.data.results.map((form: Response, index: number) => {
    forms.push({
      id: index,
      label: form.display,
      value: form.uuid,
    });
  });

  return {
    isLoading: !data && !error,
    forms,
    formsError: error,
  };
};

/**
 * @returns EncounterTypes
 */
export const useEncounterTypes = () => {
  const { data, error } = useSWRImmutable<{
    data: { results: Response[] };
  }>("/ws/rest/v1/encountertype", openmrsFetch);

  const encounterTypes: DropdownValue[] = [];
  data?.data.results.map((encounterType: Response, index: number) => {
    encounterTypes.push({
      id: index,
      label: encounterType.display,
      value: encounterType.uuid,
    });
  });
  return {
    isLoading: !data && !error,
    encounterTypes,
    encounterTypesError: error,
  };
};
