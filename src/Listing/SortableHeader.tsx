import * as React from 'react';

import {
  move,
  map,
  join,
  props as Rprops,
  pipe,
  equals,
  not,
  path,
  isNil,
  indexOf,
} from 'ramda';
import {
  DndContext,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DraggableSyntheticListeners,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { CSS, Transform } from '@dnd-kit/utilities';

import { useTheme, Chip, lighten, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { SelectEntry } from '..';

export interface ItemProps {
  name: string;
  createOption?: string;
  id: string;
  index: number;
  deleteValue: (id: number) => void;
}

const useItemStyles = makeStyles((theme) => ({
  tag: {
    margin: theme.spacing(0.5),
  },
  createdTag: {
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
  },
}));

interface ItemyProps extends Omit<ItemProps, 'id'> {
  style?: React.CSSProperties;
  chipStyle?: React.CSSProperties;
  listeners?: DraggableSyntheticListeners;
}

const Item = React.forwardRef(
  (
    {
      name,
      createOption,
      deleteValue,
      index,
      style,
      chipStyle,
      listeners,
      ...props
    }: ItemyProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const classes = useItemStyles();

    return (
      <div style={style} ref={ref}>
        <Chip
          size="small"
          label={
            <p {...props} {...listeners}>
              {name}
            </p>
          }
          className={clsx(classes.tag, createOption && classes.createdTag)}
          clickable
          onDelete={() => deleteValue(index)}
          deleteIcon={<CloseIcon />}
          style={chipStyle}
        />
      </div>
    );
  },
);

interface StyledSortableProps extends ItemProps {
  transform: Transform | null;
  isDragging: boolean;
  transition?: string;
  setNodeRef: (node: HTMLElement | null) => void;
  listeners: DraggableSyntheticListeners;
}

const StyledSortableItem = ({
  name,
  createOption,
  index,
  deleteValue,
  transform,
  isDragging,
  transition,
  setNodeRef,
  listeners,
  ...props
}: Omit<StyledSortableProps, 'id'>): JSX.Element => {
  const style: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    opacity: isDragging ? '0.7' : '1',
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Item
      {...props}
      ref={setNodeRef}
      style={style}
      listeners={listeners}
      name={name}
      createOption={createOption}
      deleteValue={deleteValue}
      index={index}
    />
  );
};

const MemoizedStyledDraggableItem = React.memo(
  StyledSortableItem,
  (prevProps, nextProps) =>
    equals(prevProps.name, nextProps.name) &&
    equals(prevProps.createOption, nextProps.createOption) &&
    equals(prevProps.index, nextProps.index) &&
    equals(prevProps.transform, nextProps.transform) &&
    equals(prevProps.isDragging, nextProps.isDragging),
);

const SortableItem = ({
  name,
  createOption,
  id,
  index,
  deleteValue,
}: ItemProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <MemoizedStyledDraggableItem
      setNodeRef={setNodeRef}
      {...attributes}
      listeners={listeners}
      name={name}
      createOption={createOption}
      deleteValue={deleteValue}
      index={index}
      transform={transform}
      transition={transition}
      isDragging={isDragging}
    />
  );
};

interface Props {
  items: Array<SelectEntry>;
  deleteValue: (id: number) => void;
  changeItemsOrder: (newItems: Array<SelectEntry>) => void;
}

const SortableList = ({
  items,
  deleteValue,
  changeItemsOrder,
}: Props): JSX.Element => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const theme = useTheme();

  const sortableItems = React.useMemo(
    () => map(pipe(Rprops(['name', 'id']), join('_')), items),
    [items],
  );

  const dragOver = (event): void => {
    const overId = path(['over', 'id'], event);

    if (
      pipe(isNil, not)(overId) &&
      pipe(equals(activeId), not)(overId as string | null)
    ) {
      const oldIndex = indexOf(activeId, sortableItems);
      const newIndex = indexOf(overId, sortableItems);
      changeItemsOrder(move(oldIndex, newIndex, items));
    }
  };

  const dragStart = (event) => {
    setActiveId(path(['active', 'id'], event) as string);
  };

  const dragCancel = () => setActiveId(null);

  const dragEnd = () => setActiveId(null);

  const getActiveElement = () => {
    if (isNil(activeId)) {
      return null;
    }
    const index = indexOf(activeId, sortableItems);
    return {
      ...items[index],
      index,
    };
  };

  const activeElement = getActiveElement();

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragOver={dragOver}
        onDragStart={dragStart}
        onDragCancel={dragCancel}
        onDragEnd={dragEnd}
      >
        <SortableContext items={sortableItems} strategy={undefined}>
          {items.map(({ name, id, createOption }, index) => (
            <SortableItem
              key={`${name}_${id}`}
              id={`${name}_${id}`}
              index={index}
              name={name}
              deleteValue={deleteValue}
              createOption={createOption}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId && (
            <Item
              name={activeElement?.name as string}
              deleteValue={deleteValue}
              createOption={activeElement?.createOption}
              index={activeElement?.index as number}
              style={{
                zIndex: theme.zIndex.tooltip,
              }}
              chipStyle={{
                boxShadow: theme.shadows[3],
              }}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default SortableList;
