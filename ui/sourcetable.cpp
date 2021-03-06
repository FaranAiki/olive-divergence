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

#include "sourcetable.h"
#include "panels/project.h"

#include "project/footage.h"
#include "panels/timeline.h"
#include "panels/viewer.h"
#include "panels/panels.h"
#include "rendering/renderfunctions.h"
#include "undo/undo.h"
#include "timeline/sequence.h"
#include "mainwindow.h"
#include "global/config.h"
#include "project/media.h"
#include "project/sourcescommon.h"
#include "global/debug.h"

#include <QDragEnterEvent>
#include <QMimeData>
#include <QHeaderView>
#include <QMenu>
#include <QMessageBox>
#include <QFileInfo>
#include <QDebug>
#include <QDesktopServices>
#include <QDir>
#include <QProcess>

SourceTable::SourceTable(SourcesCommon& commons) : commons_(commons) {
  setSortingEnabled(true);
  setAcceptDrops(true);
  sortByColumn(0, Qt::AscendingOrder);
  setContextMenuPolicy(Qt::CustomContextMenu);
  setEditTriggers(QAbstractItemView::NoEditTriggers);
  setDragDropMode(QAbstractItemView::DragDrop);
  setSelectionMode(QAbstractItemView::ExtendedSelection);
  connect(this, SIGNAL(clicked(const QModelIndex&)), this, SLOT(item_click(const QModelIndex&)));
  connect(this, SIGNAL(customContextMenuRequested(const QPoint&)), this, SLOT(show_context_menu()));
}

void SourceTable::show_context_menu() {
  commons_.show_context_menu(this, selectionModel()->selectedRows());
}

void SourceTable::item_click(const QModelIndex& index) {
  if (selectionModel()->selectedRows().size() == 1 && index.column() == 0) {
    commons_.item_click(project_parent->item_to_media(index), index);
  }
}

void SourceTable::mousePressEvent(QMouseEvent* event) {
  commons_.mousePressEvent(event);
  QTreeView::mousePressEvent(event);
}

void SourceTable::mouseDoubleClickEvent(QMouseEvent* ) {
  commons_.mouseDoubleClickEvent(selectionModel()->selectedRows());
}

void SourceTable::dragEnterEvent(QDragEnterEvent *event) {
  if (event->mimeData()->hasUrls()) {
    event->acceptProposedAction();
  } else {
    QTreeView::dragEnterEvent(event);
  }
}

void SourceTable::dragMoveEvent(QDragMoveEvent *event) {
  if (event->mimeData()->hasUrls()) {
    event->acceptProposedAction();
  } else {
    QTreeView::dragMoveEvent(event);
  }
}

void SourceTable::dropEvent(QDropEvent* event) {
  commons_.dropEvent(this, event, indexAt(event->pos()), selectionModel()->selectedRows());
}
