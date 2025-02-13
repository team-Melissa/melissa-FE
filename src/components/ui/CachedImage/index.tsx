import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { CachedImageProps } from "./types";

function CachedImage({ src, ...rest }: CachedImageProps): JSX.Element {
  const [cachedSource, setCachedSource] = useState<undefined | { uri: string }>(undefined);

  // https://.../ai-profile/8ba80263-cf09-41f3-b5c4-113b3e5476d5 와 같은 경로를 넣으면,
  // 8ba80263-cf09-41f3-b5c4-113b3e5476d5를 파일명으로 사용
  const fileName = src.split("/").pop();
  const cachedUri = `${FileSystem.cacheDirectory}${fileName}.png`;

  useEffect(() => {
    const checkCacheAndDownload = async () => {
      const info = await FileSystem.getInfoAsync(cachedUri);
      if (!info.exists) {
        console.log("기존 캐시된 이미지 X, 다운로드중...");
        await FileSystem.downloadAsync(src, cachedUri);
      }
      console.log("캐시된 이미지 사용");
      setCachedSource({ uri: cachedUri });
    };

    checkCacheAndDownload();
  }, [cachedUri, src]);

  return <Image source={cachedSource} {...rest} />;
}

export default CachedImage;
