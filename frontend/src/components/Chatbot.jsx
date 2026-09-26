import React from 'react';

export default function Chatbot() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://rihmag-myagent-myagentmain-kzujcs.streamlit.app/~/+//?embed_options=light_theme,show_padding,disable_scrolling,show_toolbar,show_footer,show_colored_line"
        title="Embedded Streamlit App"
        width="100%"
        height="100%"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
