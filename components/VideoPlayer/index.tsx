import { ReactElement, useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
// @ts-ignore
import QualitySelector from '@silvermine/videojs-quality-selector';
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';

type Source = {
  src: string;
  type: string;
  label?: string; // video quality label
  selected?: boolean; // default video quality to load
};

export interface VideoPlayerProps {
  sources: Source[];
}

const videoOptions: VideoJsPlayerOptions = {
  controls: true,
  controlBar: {
    children: [
      'playToggle',
      'volumePanel',
      'progressControl',
      'qualitySelector',
      'fullscreenToggle',
    ],
  },
  // responsive: true,
  // fluid: true,
};
QualitySelector(videojs);

export default function VideoPlayer(props: VideoPlayerProps): ReactElement {
  const { sources } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let player: VideoJsPlayer;
    if (null !== videoRef.current) {
      player = videojs(videoRef.current, videoOptions);
      player.src(sources);
    }

    return () => {
      player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
