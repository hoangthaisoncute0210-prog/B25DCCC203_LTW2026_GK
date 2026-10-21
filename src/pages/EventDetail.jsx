import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <div>
        <p>Không tìm thấy sự kiện</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết sự kiện</h2>
      <p>Tên sự kiện: {event.name}</p>
      <p>Địa điểm: {event.location}</p>
      <p>Ngày: {event.date}</p>
      <p>Số chỗ: {`${event.registered}/${event.capacity}`}</p>
      <Countdown date={event.date} />
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default EventDetail;