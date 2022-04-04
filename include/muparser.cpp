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

#include "muparser.h"

#include <cmath>

#include <QString>
#include <QDebug>

#include <muParser.h>

double inline MuParser::__floor(double val)
{
  return std::floor(val);
}

double inline MuParser::__ceil(double val)
{
  return std::ceil(val);
}

double inline MuParser::__gamma(double val)
{
  return std::tgamma(val);
}

double inline MuParser::__mod(double a, double b)
{
  return (double) ((long long int) a % (long long int) (b));
}

int MuParser::Init()
{
  return MuParser::Init(&parser);
}

int MuParser::Init(mu::Parser *p)
{
  try {
    p->DefineFun("floor", __floor);
    p->DefineFun("ceil", __ceil);
    p->DefineFun("gamma", __gamma);
    
    p->DefineOprt("%", __mod, 6);
    
    return 0;
  }
  catch (mu::Parser::exception_type &e)
  {
	std::cout << e.GetMsg();
	return 1;  
  }
}
