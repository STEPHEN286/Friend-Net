import React from 'react';
import MobileSettings from './MobileSettings';
import DesktopSettings from './DesktopSettings';

const Settings = () => {
  return (
    <>
      {/* Mobile Settings */}
      <MobileSettings />

      {/* Desktop Settings - Only visible on md and up */}
      <div className="hidden md:block">
        <DesktopSettings />
      </div>
    </>
  );
};

export default Settings; 