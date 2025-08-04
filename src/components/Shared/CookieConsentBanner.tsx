"use client"
import CookieConsent from "react-cookie-consent"

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Reject"
      enableDeclineButton
      cookieName="newsCookieConsent"
      style={{ background: "#0c0c0c", color: "white", display: "flex", alignContent: "center", alignItems: "center" }}
      buttonStyle={{ background: "#10b981", color: "#fff", fontSize: "13px" }}
      declineButtonStyle={{
        background: "#ef4444",
        color: "#fff",
        fontSize: "13px",
      }}
      expires={150}
    >
      We use cookies for analytics and personalized content. Click “Accept” to
      agree.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
