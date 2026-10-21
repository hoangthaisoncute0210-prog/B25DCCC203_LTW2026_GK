import React, { useState } from "react";
import FilterBar from "../components/FilterBar.jsx";
import EventTable from "../components/EventTable.jsx";

const EventList = ({ events, onRegister, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;

    if (statusFilter === "Còn chỗ") {
      matchesStatus = ev.registered < ev.capacity;
    } else if (statusFilter === "Đã đầy") {
      matchesStatus = ev.registered >= ev.capacity;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>Danh sách sự kiện</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <p>Tìm thấy {filteredEvents.length} sự kiện</p>

      {filteredEvents.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <EventTable
          events={filteredEvents}
          onRegister={onRegister}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default EventList;