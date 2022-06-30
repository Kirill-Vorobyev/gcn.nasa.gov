/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { NestedCheckboxes } from './NestedCheckboxes'

export function NoticeTypeCheckboxes() {
  return (
    <NestedCheckboxes
      nodes={Object.entries({
        Agile: [
          'AGILE_GRB_GROUND',
          'AGILE_GRB_POS_TEST',
          'AGILE_GRB_REFINED',
          'AGILE_GRB_WAKEUP',
          'AGILE_MCAL_ALERT',
          'AGILE_POINTDIR',
          'AGILE_TRANS',
        ],
        AMON: [
          'AMON_ICECUBE_COINC',
          'AMON_ICECUBE_EHE',
          'AMON_ICECUBE_HESE',
          'AMON_NU_EM_COINC',
        ],
        Calet: [
          'CALET_GBM_FLT_LC',
          'CALET_GBM_GND_LC',
          'FERMI_GBM_ALERT',
          'FERMI_GBM_ALERT_INTERNAL',
          'FERMI_GBM_FIN_INTERNAL',
          'FERMI_GBM_FIN_POS',
          'FERMI_GBM_FLT_INTERNAL',
          'FERMI_GBM_FLT_POS',
          'FERMI_GBM_GND_INTERNAL',
          'FERMI_GBM_GND_POS',
          'FERMI_GBM_LC',
          'FERMI_GBM_POS_TEST',
          'FERMI_GBM_SUBTHRESH',
          'FERMI_GBM_TRANS',
          'FERMI_LAT_GND',
          'FERMI_LAT_MONITOR',
          'FERMI_LAT_OFFLINE',
          'FERMI_LAT_POS_DIAG',
          'FERMI_LAT_POS_INI',
          'FERMI_LAT_POS_TEST',
          'FERMI_LAT_POS_UPD',
          'FERMI_LAT_TRANS',
          'FERMI_POINTDIR',
          'FERMI_SC_SLEW',
          'FERMI_SC_SLEW_INTERNAL',
        ],
        HETE: [
          'HETE_ALERT_SRC',
          'HETE_FINAL_SRC',
          'HETE_GNDANA_SRC',
          'HETE_TEST',
          'HETE_UPDATE_SRC',
        ],
        IceCube: [
          'ICECUBE_ASTROTRACK_BRONZE',
          'ICECUBE_ASTROTRACK_GOLD',
          'ICECUBE_CASCADE',
        ],
        INTEGRAL: [
          'INTEGRAL_OFFLINE',
          'INTEGRAL_POINTDIR',
          'INTEGRAL_REFINED',
          'INTEGRAL_SPIACS',
          'INTEGRAL_WAKEUP',
          'INTEGRAL_WEAK',
        ],
        IPN: ['IPN_POS', 'IPN_RAW', 'IPN_SEG'],
        LVC: [
          'LVC_COUNTERPART',
          'LVC_EARLY_WARNING',
          'LVC_INITIAL',
          'LVC_PRELIMINARY',
          'LVC_RETRACTION',
          'LVC_TEST',
          'LVC_UPDATE',
        ],
        MAXI: ['MAXI_KNOWN', 'MAXI_TEST', 'MAXI_UNKNOWN'],
        SAX: ['SAX_NFI_ALERT', 'SAX_NFI_SRC', 'SAX_WFC_ALERT', 'SAX_WFC_SRC'],
        Swift: [
          'SWIFT_ACTUAL_POINTDIR',
          'SWIFT_BAT_ALARM_LONG',
          'SWIFT_BAT_ALARM_SHORT',
          'SWIFT_BAT_GRB_ALERT',
          'SWIFT_BAT_GRB_LC',
          'SWIFT_BAT_GRB_LC_PROC',
          'SWIFT_BAT_GRB_POS_ACK',
          'SWIFT_BAT_GRB_POS_NACK',
          'SWIFT_BAT_GRB_POS_TEST',
          'SWIFT_BAT_KNOWN_SRC',
          'SWIFT_BAT_MONITOR',
          'SWIFT_BAT_QL_POS',
          'SWIFT_BAT_SCALEDMAP',
          'SWIFT_BAT_SLEW_POS',
          'SWIFT_BAT_SUB_THRESHOLD',
          'SWIFT_BAT_SUBSUB',
          'SWIFT_BAT_TRANS',
          'SWIFT_FOM_OBS',
          'SWIFT_FOM_PPT_ARG_ERR',
          'SWIFT_FOM_SAFE_POINT',
          'SWIFT_FOM_SLEW_ABORT',
          'SWIFT_POINTDIR',
          'SWIFT_SC_SLEW',
          'SWIFT_TOO_FOM',
          'SWIFT_TOO_SC_SLEW',
          'SWIFT_UVOT_DBURST',
          'SWIFT_UVOT_DBURST_PROC',
          'SWIFT_UVOT_EMERGENCY',
          'SWIFT_UVOT_FCHART',
          'SWIFT_UVOT_FCHART_PROC',
          'SWIFT_UVOT_POS',
          'SWIFT_UVOT_POS_NACK',
          'SWIFT_XRT_CENTROID',
          'SWIFT_XRT_EMERGENCY',
          'SWIFT_XRT_IMAGE',
          'SWIFT_XRT_IMAGE_PROC',
          'SWIFT_XRT_LC',
          'SWIFT_XRT_POSITION',
          'SWIFT_XRT_SPECTRUM',
          'SWIFT_XRT_SPECTRUM_PROC',
          'SWIFT_XRT_SPER',
          'SWIFT_XRT_SPER_PROC',
          'SWIFT_XRT_THRESHPIX',
          'SWIFT_XRT_THRESHPIX_PROC',
        ],
        XTE: [
          'XTE_ASM_ALERT',
          'XTE_ASM_SRC',
          'XTE_ASM_TRANS',
          'XTE_PCA_ALERT',
          'XTE_PCA_SRC',
        ],
        Other: [
          'AAVSO',
          'ALEXIS_SRC',
          'BRAD_COORDS',
          'CBAT',
          'COINCIDENCE',
          'COMPTEL_SRC',
          'DOW_TOD',
          'GRB_CNTRPART',
          'GRB_COORDS',
          'GRB_FINAL',
          'GWHEN_COINC',
          'HAWC_BURST_MONITOR',
          'HUNTS_SRC',
          'KONUS_LC',
          'MAXBC',
          'MILAGRO_POS',
          'MOA',
          'OGLE',
          'SIMBADNED',
          'SK_SN',
          'SNEWS',
          'SUZAKU_LC',
          'TEST_COORDS',
        ],
      }).map(([mission, noticeTypes]) => ({
        id: mission,
        label: mission,
        name: mission,
        nodes: noticeTypes.map((noticeType) => ({
          id: noticeType,
          label: noticeType,
          name: noticeType,
          className: 'sub-option',
        })),
      }))}
    />
  )
}
