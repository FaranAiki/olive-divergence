/***

    Olive - Non-Linear Video Editor
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

#include <QString>
#include <muParser.h>

#ifndef MUPARSER_FUN_H
#define MUPARSER_FUN_H

namespace MuParser {
  static mu::Parser parser;
  
  double inline __floor(double val);
  double inline __ceil(double val);
  double inline __gamma(double val);
  
  double inline __mod(double a, double b);
  
  int Init(mu::Parser *p);
  int Init();
}

#endif // MATH_H
