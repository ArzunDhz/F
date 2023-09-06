import NavBar from "@/components/NavBar";
import Provider from "@/components/Provider";
import ThemeProvider from "@./components/ThemeProvider";
export const metadata = {
  title: "Fauro",
  description: "Generate your thought",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="transition-all duration-1000 ease-in-out bg-white noSelect dark:bg-primary-dark debug-screens"
      >
        <Provider>
          <ThemeProvider>
            <NavBar />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
