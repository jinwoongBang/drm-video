// 시간을 hh:mm:ss 형식으로 변환하는 헬퍼 함수
export const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
};

// 숫자를 1000 단위로 파싱하는 유틸 함수
export const parseNumberWithK = (number: number): string => {
  if (number < 1000) {
    return number.toString();
  }

  const kValue = number / 1000;
  const formattedValue = kValue.toFixed(1);

  // 소수점 이하가 .0인 경우 정수로 표시
  return formattedValue.endsWith(".0")
    ? `${Math.floor(kValue)}K`
    : `${formattedValue}K`;
};
