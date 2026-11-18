import { CalendarDays, Clock3 } from "@/assets/icons/icons";
import AppImage from "@/shared/components/atoms/Image";
import Text from "@/shared/components/atoms/Text";
import IconText from "../molecules/IconText";
import { StaticImageData } from "next/image";
import defaultCover from "@/assets/images/responseHeroImg.jpg";

type SurveyDetailsCardProps = {
  title: string;
  description: string;
  deadline: string;
  duration: string;
  image: string | StaticImageData;
};

export default function SurveyDetailsCard({
  title,
  description,
  deadline,
  duration,
  image,
}: SurveyDetailsCardProps) {
  const coverSrc: string | StaticImageData = image || defaultCover;

  return (
    <section className="ds-bg-card ds-rounded-xl mt-12 mb-16 px-5 py-8 sm:px-6">
      <div className="space-y-3.5">
        <div className="ds-primary-200 ds-rounded-xl relative aspect-2/1 w-full overflow-hidden md:aspect-auto md:h-[300px]">
          <AppImage
            src={coverSrc}
            alt={`${title} cover image`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1232px"
            className="!absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          />
        </div>
        <div className="space-y-2.5">
          <h1 className="ds-text-primary ds-text-lg normal-case">{title}</h1>

          <Text size="md" variant="disabled">
            {description}
          </Text>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <IconText IconComponent={CalendarDays} iconVariant="disabled" iconSize="xs">
            <Text size="xs" variant="disabled">
              {deadline}
            </Text>
          </IconText>

          <IconText IconComponent={Clock3} iconVariant="disabled" iconSize="xs">
            <Text size="xs" variant="disabled">
              {duration}
            </Text>
          </IconText>
        </div>
      </div>
    </section>
  );
}
