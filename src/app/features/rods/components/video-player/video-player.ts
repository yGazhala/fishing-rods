import { Component, computed, inject, input, SecurityContext } from '@angular/core';
import { VideoMetadata } from '../../../../types/video-metadata';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer {
  public metadata = input.required<VideoMetadata>();

  private sanitizer = inject(DomSanitizer);

  protected youtubeUrl = computed(() => {
    const { provider, videoId } = this.metadata();
    if (provider === 'youtube') {
      const url = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  });
}
