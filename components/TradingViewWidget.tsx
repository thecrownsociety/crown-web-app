"use client";
import React, { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "description": "",
            "proName": "INDEX:SENSEX"
          },
          {
            "description": "",
            "proName": "ECONOMICS:INGDP"
          },
          {
            "description": "",
            "proName": "NSE:NIFTY"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      }
    `;
    document
      .querySelector(".tradingview-widget-container__widget")
      ?.appendChild(script);

    return () => {
      document
        .querySelector(".tradingview-widget-container__widget")
        ?.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
