/***

    Olive - Non-Linear Video Editor
    Copyright (C) 2019  Olive Team

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

***/

#include "footage.h"

#include <QDebug>
#include <QtMath>
#include <QPainter>

#include "project/previewgenerator.h"
#include "timeline/clip.h"

Footage::Footage() {
  ready = (false);
  preview_gen = (nullptr);
  invalid = (false);
  in = (0);
  out = (0);
  speed = (1.0);
  alpha_is_premultiplied = (false);
  proxy = (false);
  start_number = 0;

  ready_lock.lock();
}

Footage::~Footage() {
  reset();
}

void Footage::reset() {
  if (preview_gen != nullptr) {
    preview_gen->cancel();
  }
  video_tracks.clear();
  audio_tracks.clear();
  ready = false;
}

long Footage::get_length_in_frames(double frame_rate) {
  if (length >= 0) {
    return qFloor((double(length) / double(AV_TIME_BASE)) * frame_rate / speed);
  }
  return 0;
}

FootageStream* Footage::get_stream_from_file_index(bool video, int index) {
  if (video) {
    for (int i=0;i<video_tracks.size();i++) {
      if (video_tracks.at(i).file_index == index) {
        return &video_tracks[i];
      }
    }
  } else {
    for (int i=0;i<audio_tracks.size();i++) {
      if (audio_tracks.at(i).file_index == index) {
        return &audio_tracks[i];
      }
    }
  }
  return nullptr;
}
