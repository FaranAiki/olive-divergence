/***

    Olive - Non-Linear Video Editor
    
    Copyright (C) 2022 Muhammad Faran Aiki
    Copyright (C) 2022 Olive Team

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

#include "crossdissolvetransition.h"

#include <QOpenGLFunctions>

CrossDissolveTransition::CrossDissolveTransition(Clip* c, Clip* s, const EffectMeta* em) : Transition(c, s, em) {
  SetFlags(Effect::CoordsFlag);
}

void CrossDissolveTransition::process_coords(double progress, GLTextureCoords& coords, int data) {
  if (!(data == kTransitionClosing && secondary_clip != nullptr)) {
    if (data == kTransitionClosing) progress = 1.0 - progress;
    coords.opacity *= progress;
  }
}
