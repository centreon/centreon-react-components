import * as React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Item from './Item';

interface Props {
  name;
  createOption;
  id;
  index;
  deleteValue;
}

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

  const style = {
    position: 'relative',
    display: 'inline-block',
    opacity: isDragging ? '0.7' : '1',
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      listeners={listeners}
      name={name}
      createOption={createOption}
      deleteValue={deleteValue}
      index={index}
    />
  );
};

export default SortableItem;
