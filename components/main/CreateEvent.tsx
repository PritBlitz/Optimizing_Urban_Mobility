import { useEffect, useState } from "react";

interface Event {
  id: number;
  eventName: string;
  eventDate: string;
  teamSize: number;
  eventType: string;
  duration: string;
  internship: boolean;
  rank1Prize: string;
  rank2Prize: string;
  rank3Prize: string;
  description: string;
  poster: string; // Base64-encoded image
}
export default function CreateEvent() {
    
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    teamSize: "",
    eventType: "",
    duration: "",
    internship: false,
    rank1Prize: "",
    rank2Prize: "",
    rank3Prize: "",
    description: "",
    poster: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, poster: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      if (typedKey === "poster" && formData[typedKey]) {
        data.append("poster", formData[typedKey] as Blob);
      } else {
        data.append(typedKey, typedKey === "internship" ? String(formData[typedKey]) : String(formData[typedKey]));
      }
    });

    const res = await fetch("https://powerful-art-production.up.railway.app/events", {
      method: "POST",
      body: data,
    });
    console.log("hii")
    if (res.ok) alert("Event created successfully");
    else alert("Failed to create event");
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="eventName" onChange={handleChange} placeholder="Event Name" required />
      <input type="date" name="eventDate" onChange={handleChange} required />
      <input type="number" name="teamSize" onChange={handleChange} placeholder="Team Size" required />
      <input type="text" name="eventType" onChange={handleChange} placeholder="Event Type" required />
      <input type="text" name="duration" onChange={handleChange} placeholder="Duration" required />
      <input type="text" name="rank1Prize" onChange={handleChange} placeholder="Rank 1 Prize" required />
      <input type="text" name="rank2Prize" onChange={handleChange} placeholder="Rank 2 Prize" required />
      <input type="text" name="rank3Prize" onChange={handleChange} placeholder="Rank 3 Prize" required />
      <textarea name="description" onChange={handleChange} placeholder="Description" required></textarea>
      <input type="checkbox" name="internship" onChange={handleChange} /> Internship?
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Create Event</button>
    </form>
    <EventList/>
    </>
  );
}

function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
  
    useEffect(() => {
      fetch("https://powerful-art-production.up.railway.app/events")
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error("Error fetching events:", err));
    }, []);
  
    return (
      <div>
        <h2>All Events</h2>
        <div>
          {events.map((event) => (
            <div key={event.id}>
              <h3>{event.eventName}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.eventDate}</p>
              <p><strong>Team Size:</strong> {event.teamSize}</p>
              <p><strong>Type:</strong> {event.eventType}</p>
              <p><strong>Duration:</strong> {event.duration}</p>
              <p><strong>Internship:</strong> {event.internship ? "Yes" : "No"}</p>
              <p><strong>Prizes:</strong> 1st - {event.rank1Prize}, 2nd - {event.rank2Prize}, 3rd - {event.rank3Prize}</p>
  
              {/* Display the Base64 image */}
              {event.poster && (
                <img
                  src={`data:image/png;base64,${event.poster}`}
                  alt="Event Poster"
                  style={{ width: "300px", height: "200px" }}
                />
              )}
  
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
