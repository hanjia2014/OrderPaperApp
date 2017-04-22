// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

'use strict';

import {DragDropConfig} from './dnd.config';
import {DragDropService, DragDropSortableService} from './dnd.service';
import {DraggableComponent} from './draggable.component';
import {DroppableComponent} from './droppable.component';
import {SortableContainer, SortableComponent} from './sortable.component';

export * from './abstract.component';
export * from './dnd.config';
export * from './dnd.service';
export * from './draggable.component';
export * from './droppable.component';
export * from './sortable.component';

export const DND_PROVIDERS: any[] = [DragDropConfig, DragDropService, DragDropSortableService];
export const DND_DIRECTIVES: any[] = [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent];