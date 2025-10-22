import React from "react";
import Navbar from "./_components/Navbar";

function Publiclayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <main className="container mx-auto px-4 mb-32 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default Publiclayout;
