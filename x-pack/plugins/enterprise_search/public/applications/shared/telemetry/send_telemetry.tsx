/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useEffect } from 'react';
import { useValues } from 'kea';

import { HttpSetup } from 'src/core/public';
import { JSON_HEADER as headers } from '../../../../common/constants';
import { HttpLogic } from '../http';

interface ISendTelemetryProps {
  action: 'viewed' | 'error' | 'clicked';
  metric: string; // e.g., 'setup_guide'
}

interface ISendTelemetry extends ISendTelemetryProps {
  http: HttpSetup;
  product: 'app_search' | 'workplace_search' | 'enterprise_search';
}

/**
 * Base function - useful for non-component actions, e.g. clicks
 */

export const sendTelemetry = async ({ http, product, action, metric }: ISendTelemetry) => {
  try {
    const body = JSON.stringify({ product, action, metric });
    await http.put('/api/enterprise_search/stats', { headers, body });
  } catch (error) {
    throw new Error('Unable to send telemetry');
  }
};

/**
 * React component helpers - useful for on-page-load/views
 */

export const SendEnterpriseSearchTelemetry: React.FC<ISendTelemetryProps> = ({
  action,
  metric,
}) => {
  const { http } = useValues(HttpLogic);

  useEffect(() => {
    sendTelemetry({ http, action, metric, product: 'enterprise_search' });
  }, [action, metric, http]);

  return null;
};

export const SendAppSearchTelemetry: React.FC<ISendTelemetryProps> = ({ action, metric }) => {
  const { http } = useValues(HttpLogic);

  useEffect(() => {
    sendTelemetry({ http, action, metric, product: 'app_search' });
  }, [action, metric, http]);

  return null;
};

export const SendWorkplaceSearchTelemetry: React.FC<ISendTelemetryProps> = ({ action, metric }) => {
  const { http } = useValues(HttpLogic);

  useEffect(() => {
    sendTelemetry({ http, action, metric, product: 'workplace_search' });
  }, [action, metric, http]);

  return null;
};
