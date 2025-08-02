import React, { useEffect } from 'react';

/**
 * Consent Popup Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether popup is open
 * @param {Function} props.onClose - Function to close popup
 * @param {Function} props.onAccept - Function to accept consent
 * @returns {JSX.Element} Consent popup component
 */
const ConsentPopup = ({ isOpen, onClose, onAccept }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#00000088] flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Privacy Policy & Consent
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              By submitting your details, you agree to PNB MetLife's <span className="text-[#1362A4] font-medium">Privacy Policy</span> and authorize PNB MetLife and/or its authorized service providers to verify the above information and/or contact you to assist you with the policy purchase and/or servicing.
            </p>
            
            <p>
              The <span className="font-medium">approval</span> / <span className="font-medium">authorization</span> provided by you herein will supersede all earlier authorizations / approvals / disapprovals / registrations made by you in this regard.
            </p>

            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-xs text-blue-800">
                <strong>Important:</strong> Your consent is required to proceed with the application. You can withdraw this consent at any time by contacting our customer service.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-4 py-2 bg-[#F67F36] text-white rounded-md hover:bg-[#E06A2B] transition-colors font-medium"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentPopup; 