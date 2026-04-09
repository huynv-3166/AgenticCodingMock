import Image from "next/image";

export function BackgroundLayers() {
  return (
    <>
      {/* Background artwork */}
      <Image
        src="/assets/auth/login/background.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Left gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0) 100%)",
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0) 51.74%)",
        }}
      />
    </>
  );
}
