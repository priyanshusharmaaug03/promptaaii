import "@styles/globals.css";

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
      </body>
      <main className="app">{children}</main>
    </html>
  );
};

export default layout;
