import Image from "next/image"

const sponsors = [
  {
    name: "EcoTech Solutions",
    logo: "/placeholder.svg?height=80&width=200",
    contribution: "250 tons CO₂ offset",
  },
  {
    name: "Green Future Inc",
    logo: "/placeholder.svg?height=80&width=200",
    contribution: "180 tons CO₂ offset",
  },
  {
    name: "Sustainable Ventures",
    logo: "/placeholder.svg?height=80&width=200",
    contribution: "320 tons CO₂ offset",
  },
  {
    name: "ClimateFirst Corp",
    logo: "/placeholder.svg?height=80&width=200",
    contribution: "210 tons CO₂ offset",
  },
  {
    name: "EarthCare Partners",
    logo: "/placeholder.svg?height=80&width=200",
    contribution: "290 tons CO₂ offset",
  },
]

export default function SponsorShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {sponsors.map((sponsor) => (
        <div key={sponsor.name} className="flex flex-col items-center text-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2">
            <Image
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              width={200}
              height={80}
              className="h-12 object-contain"
            />
          </div>
          <p className="font-medium text-sm">{sponsor.name}</p>
          <p className="text-xs text-muted-foreground">{sponsor.contribution}</p>
        </div>
      ))}
    </div>
  )
}

