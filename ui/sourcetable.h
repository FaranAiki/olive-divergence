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

#ifndef SOURCETABLE_H
#define SOURCETABLE_H

#include <QTreeView>
#include <QTimer>
#include <QUndoCommand>

#include "project/sourcescommon.h"

class Project;
class Media;

class SourceTable : public QTreeView
{
  Q_OBJECT
public:
  SourceTable(SourcesCommon& commons);
  Project* project_parent;
protected:
  void mousePressEvent(QMouseEvent*);
  void mouseDoubleClickEvent(QMouseEvent *);
  void dragEnterEvent(QDragEnterEvent *event);
  void dragMoveEvent(QDragMoveEvent *event);
  void dropEvent(QDropEvent *event);
private slots:
  void item_click(const QModelIndex& index);
  void show_context_menu();
private:
  SourcesCommon& commons_;
};

#endif // SOURCETABLE_H
