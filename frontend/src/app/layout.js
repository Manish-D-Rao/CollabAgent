import "./globals.css";

export const metadata = {
  title: "CollabAgent | Multiplayer Agent Workspace",
  description:
    "A collaborative workspace for observing and controlling long-running AI agents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
