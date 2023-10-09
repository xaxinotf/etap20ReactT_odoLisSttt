import React from "react";
import {useDrag, useDrop} from "react-dnd";
import "./ToDoList.css"

export default function DraggableTask({ task, onMove, onDelete }) {
    const ItemType = 'TASK';
    const ref = React.useRef(null);
    const [, drop] = useDrop({
        accept: ItemType,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = task.index;
            if (dragIndex === hoverIndex) {
                return;
            }

            onMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: task.id, index: task.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <li ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} key={task.id}>
            <div>
                {task.text}
                <button onClick={() => onDelete(task.id)} className="delete-button">Delete</button>
            </div>
        </li>
    );
}