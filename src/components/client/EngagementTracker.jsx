'use client';

import { useEffect } from 'react';
import { initEngagementTracking } from '../../lib/gtm';

export default function EngagementTracker({ page }) {
  useEffect(() => initEngagementTracking(page), [page]);

  return null;
}
