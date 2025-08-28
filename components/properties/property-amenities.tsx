import { Badge } from "@/components/ui/badge"
import {
  Car,
  Shield,
  Droplets,
  Zap,
  PocketIcon as Pool,
  Dumbbell,
  Wifi,
  Tv,
  AirVent,
  Utensils,
  type LucideIcon,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Map of amenity names to icons
  const amenityIcons: Record<string, LucideIcon> = {
    Parking: Car,
    Security: Shield,
    "Water Tank": Droplets,
    "Backup Generator": Zap,
    "Swimming Pool": Pool,
    Gym: Dumbbell,
    WiFi: Wifi,
    TV: Tv,
    AC: AirVent,
    Kitchen: Utensils,
  }

  return (
    <div className="flex flex-wrap gap-2">
      {amenities.map((amenity) => {
        const IconComponent = amenityIcons[amenity]

        return (
          <Badge key={amenity} variant="outline" className="flex items-center gap-1 py-1">
            {IconComponent && <IconComponent className="h-3 w-3" />}
            {amenity}
          </Badge>
        )
      })}
    </div>
  )
}
