import * as React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { equals } from 'ramda';

import Item from './Item';

interface Props {
  name;
  createOption;
  id;
  index;
  deleteValue;
}

interface StyledProps extends Props {
  transform;
  isDragging;
  transition;
  setNodeRef;
  listeners;
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
}: Omit<StyledProps, 'id'>): JSX.Element => {
  const style = {
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
}: Props): JSX.Element => {
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

export default SortableItem;
