import * as React from 'react';

import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(
  ({ items, isSorting, deleteValue }): JSX.Element => {
    return (
      <div>
        {items.map((tag, index) => (
          <SortableItem
            createOption={tag.createOption}
            deleteValue={deleteValue}
            idx={index}
            index={index}
            isSorting={isSorting}
            key={`${tag.name}_${index.toString()}`}
            name={tag.name}
          />
        ))}
      </div>
    );
  },
);

export default SortableList;
