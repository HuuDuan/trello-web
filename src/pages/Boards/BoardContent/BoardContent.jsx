import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
  // Yếu cầu chuột di chuyển 10px mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  //Nhấn giữ 250ms và dung sai cua cảm ứng (dễ hiểu là di chuyển/chênh lệch 500px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });

  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    console.log("handleDragEnd: ", event);
    const { active, over } = event;

    // Kiểm tra nếu không tồn tại over (kéo thả linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return;

    // nếu vị trí ssau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // lấy vị trí mới từ over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

      // Cập nhật lại state columns ban đầu sau khi kéo thả
      setOrderedColumns(dndOrderedColumns);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1679d2",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
