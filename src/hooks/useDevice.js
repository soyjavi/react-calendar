import { useEffect, useMemo, useState } from 'react';

import { getResolution } from './helpers';

export const useDevice = () => {
  const [resolution, setResolution] = useState(getResolution());

  useEffect(() => {
    window.onresize = () => setResolution(getResolution());

    return () => {
      window.onresize = undefined;
    };
  }, []);

  return useMemo(() => {
    const isLandscape = resolution.width >= resolution.height;
    const isMobile = resolution.width < 512;
    const hasTouch = false;
    const userAgent = '';

    return {
      ...resolution,
      hasTouch,
      isLandscape,
      isPortrait: !isLandscape,
      isMobile,
      isDesktop: !isMobile,
      userAgent,
    };
  }, [resolution]);
};
