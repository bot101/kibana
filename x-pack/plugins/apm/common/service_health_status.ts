/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { ANOMALY_SEVERITY } from '../../ml/common';

import { EuiTheme } from '../../xpack_legacy/common';

export enum ServiceHealthStatus {
  healthy = 'healthy',
  critical = 'critical',
  warning = 'warning',
  unknown = 'unknown',
}

export function getServiceHealthStatus({
  severity,
}: {
  severity: ANOMALY_SEVERITY;
}) {
  switch (severity) {
    case ANOMALY_SEVERITY.CRITICAL:
    case ANOMALY_SEVERITY.MAJOR:
      return ServiceHealthStatus.critical;

    case ANOMALY_SEVERITY.MINOR:
    case ANOMALY_SEVERITY.WARNING:
      return ServiceHealthStatus.warning;

    case ANOMALY_SEVERITY.LOW:
      return ServiceHealthStatus.healthy;

    case ANOMALY_SEVERITY.UNKNOWN:
      return ServiceHealthStatus.unknown;
  }
}

export function getServiceHealthStatusColor(
  theme: EuiTheme,
  status: ServiceHealthStatus
) {
  switch (status) {
    case ServiceHealthStatus.healthy:
      return theme.eui.euiColorVis0;
    case ServiceHealthStatus.warning:
      return theme.eui.euiColorVis5;
    case ServiceHealthStatus.critical:
      return theme.eui.euiColorVis9;
    case ServiceHealthStatus.unknown:
      return theme.eui.euiColorMediumShade;
  }
}

export function getServiceHealthStatusLabel(status: ServiceHealthStatus) {
  switch (status) {
    case ServiceHealthStatus.critical:
      return i18n.translate('xpack.apm.serviceHealthStatus.critical', {
        defaultMessage: 'Critical',
      });

    case ServiceHealthStatus.warning:
      return i18n.translate('xpack.apm.serviceHealthStatus.warning', {
        defaultMessage: 'Warning',
      });

    case ServiceHealthStatus.healthy:
      return i18n.translate('xpack.apm.serviceHealthStatus.healthy', {
        defaultMessage: 'Healthy',
      });

    case ServiceHealthStatus.unknown:
      return i18n.translate('xpack.apm.serviceHealthStatus.unknown', {
        defaultMessage: 'Unknown',
      });
  }
}
