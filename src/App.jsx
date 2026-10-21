import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem("gk_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get("/data/events.json", { signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError("Không tải được dữ liệu");
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem("gk_events", JSON.stringify(events));
    }
  }, [events, loading, error]);

  const handleRegister = (id) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id && ev.registered < ev.capacity
          ? { ...ev, registered: ev.registered + 1 }
          : ev
      )
    );
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleAddEvent = (newEventData) => {
    const maxId = events.length > 0 ? Math.max(...events.map((e) => e.id)) : 0;
    const newEvent = {
      ...newEventData,
      id: maxId + 1,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Home events={events} />
            )
          }
        />
        <Route
          path="events"
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <EventList
                events={events}
                onRegister={handleRegister}
                onDelete={handleDelete}
              />
            )
          }
        />
        <Route
          path="events/new"
          element={<AddEvent onAddEvent={handleAddEvent} />}
        />
        <Route
          path="events/:id"
          element={<EventDetail events={events} />}
        />
      </Route>
    </Routes>
  );
};

export default App;