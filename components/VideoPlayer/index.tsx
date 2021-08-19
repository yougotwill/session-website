import { ReactElement, useRef, useEffect } from 'react';
import videojs, { VideoJsPlayerOptions } from 'video.js';
// @ts-ignore
import QualitySelector from '@silvermine/videojs-quality-selector';
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
import { UI } from '@/constants';
import { useScreen } from '@/contexts/screen';

type Source = {
  src: string;
  type: string;
  label?: string; // video quality label
  selected?: boolean; // default video quality to load
};

export interface VideoPlayerProps {
  hasQualityLevels?: boolean;
  poster?: string;
  sources: Source[];
}

const videoOptions: VideoJsPlayerOptions = {
  controls: true,
  controlBar: {
    children: [
      'playToggle',
      'volumePanel',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'qualitySelector',
      'fullscreenToggle',
    ],
  },
  fluid: true,
};

export default function VideoPlayer(props: VideoPlayerProps): ReactElement {
  const { isTablet, isDesktop, isMonitor } = useScreen();
  const { hasQualityLevels = false, poster, sources } = props;

  const videoWidth = (() => {
    let width = 320;
    if (isTablet) {
      width = 720;
    }
    if (isDesktop) {
      width = 672;
    }
    if (isMonitor) {
      width = UI.DESKTOP_BREAKPOINT;
    }
    return width;
  })();

  if (hasQualityLevels) {
    QualitySelector(videojs);
  }
  videoOptions.poster = poster;
  videoOptions.sources = sources;

  const key = sources[0].src;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (null !== videoRef.current) {
      const players = videojs.getAllPlayers();
      if (players && players.length > 0) {
        players.forEach((player) => {
          // set width once videojs and useScreen have completely initialized
          player.width(videoWidth);
        });
      } else {
        videojs(videoRef.current, videoOptions);
      }
    }
  }, [videoWidth]);

  return (
    <div style={{ width: videoWidth }}>
      <div data-vjs-player key={key}>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
}
