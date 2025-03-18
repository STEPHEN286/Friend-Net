import React from 'react';

const DangerZone = ({ handleLogout }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-medium text-red-800">Danger Zone</h3>
        <p className="mt-2 text-sm text-red-600">
          Actions in this section can lead to permanent data loss. Please proceed with caution.
        </p>
        <button
          type="button"
          className="mt-4 w-full py-2 px-4 border border-red-300 text-red-700 rounded-md hover:bg-red-100"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DangerZone;