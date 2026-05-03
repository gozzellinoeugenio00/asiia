"use client";

import { useState } from "react";
import Image from "next/image";

interface LogoImageProps {
  companyName: string;
  website?: string;
}

export default function LogoImage({ companyName, website }: LogoImageProps) {
  const [error, setError] = useState(false);

  return (
    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-primary overflow-hidden">
      {!website || error ? (
        <span>{companyName.charAt(0)}</span>
      ) : (
        <Image
          src={`https://logo.clearbit.com/${new URL(website.startsWith("http") ? website : `https://${website}`).hostname}`}
          alt={companyName}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-2xl"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
