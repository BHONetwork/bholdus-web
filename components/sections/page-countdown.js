import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

const calculateTimeLeft = (endTime) => {
  const current = new Date();
  const difference = new Date(endTime) - current;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const PageCountdown = ({ data }) => {
  const { t } = useTranslation();
  const countdown = data;

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(countdown?.endTime || 0)
  );

  useEffect(() => {
    if (!timeLeft) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countdown?.endTime || 0));
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="py-10 text-center">
      {timeLeft ? (
        <p style={{ fontSize: 100 }}>
          {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
          {timeLeft.seconds}
        </p>
      ) : (
        <p style={{ fontSize: 100 }}>{t("common:countdownEnd")}</p>
      )}
    </div>
  );
};

export default PageCountdown;
