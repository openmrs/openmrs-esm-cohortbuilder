import React, { useState } from "react";

import {
  ComposedModal,
  ModalFooter,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import { showToast } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";

import { DefinitionDataRow } from "../../../types";

enum Options {
  VIEW,
  DELETE,
}

interface SavedCohortsOptionsProps {
  cohort: DefinitionDataRow;
  onViewCohort: (cohortId: string) => Promise<void>;
  onDeleteCohort: (cohortId: string) => Promise<void>;
}

const SavedCohortsOptions: React.FC<SavedCohortsOptionsProps> = ({
  cohort,
  onViewCohort,
  onDeleteCohort,
}) => {
  const { t } = useTranslation();
  const [isDeleteCohortModalVisible, setIsDeleteCohortModalVisible] =
    useState(false);

  const handleViewCohort = async () => {
    try {
      await onViewCohort(cohort.id);
    } catch (error) {
      showToast({
        title: t("cohortViewError", "Error viewing the cohort"),
        kind: "error",
        critical: true,
        description: error?.message,
      });
    }
  };

  const handleOption = async (option: Options) => {
    switch (option) {
      case Options.VIEW:
        handleViewCohort();
        break;
      case Options.DELETE:
        setIsDeleteCohortModalVisible(true);
        break;
    }
  };

  const handleDeleteCohort = async () => {
    await onDeleteCohort(cohort.id);
    setIsDeleteCohortModalVisible(false);
  };

  return (
    <>
      <OverflowMenu
        ariaLabel="overflow-menu"
        size="md"
        flipped
        direction="bottom"
        data-testid="options"
      >
        <OverflowMenuItem
          data-testid="view"
          itemText={t("view", "View")}
          onClick={() => handleOption(Options.VIEW)}
        />
        <OverflowMenuItem
          data-testid="delete"
          itemText={t("delete", "Delete")}
          onClick={() => handleOption(Options.DELETE)}
        />
      </OverflowMenu>

      <ComposedModal
        size={"sm"}
        open={isDeleteCohortModalVisible}
        onClose={() => setIsDeleteCohortModalVisible(false)}
      >
        <ModalHeader>
          <p>
            {t(
              "deleteItem",
              `Are you sure you want to delete ${cohort?.name}?`,
              {
                itemName: cohort?.name,
              }
            )}
          </p>
        </ModalHeader>
        <ModalFooter
          danger
          onRequestSubmit={handleDeleteCohort}
          primaryButtonText={t("delete", "Delete")}
          secondaryButtonText={t("cancel", "Cancel")}
        />
      </ComposedModal>
    </>
  );
};

export default SavedCohortsOptions;
