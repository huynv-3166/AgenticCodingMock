interface EventInfoProps {
  dateDisplay: string;
  location: string;
  livestreamInfo: string;
  timeLabel: string;
  locationLabel: string;
}

export function EventInfo({
  dateDisplay,
  location,
  livestreamInfo,
  timeLabel,
  locationLabel,
}: EventInfoProps) {
  return (
    <div className="flex flex-col gap-4 font-montserrat text-base font-normal">
      {/* Row 1: Time and Location */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-[60px]">
        <p>
          <span className="text-[#FFEA9E]">{timeLabel}</span>{" "}
          <span className="text-white">{dateDisplay}</span>
        </p>
        <p>
          <span className="text-[#FFEA9E]">{locationLabel}</span>{" "}
          <span className="text-white">{location}</span>
        </p>
      </div>

      {/* Row 2: Livestream note */}
      <p className="text-white">{livestreamInfo}</p>
    </div>
  );
}
