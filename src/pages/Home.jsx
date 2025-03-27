// Home.jsx
import { useEffect, useState } from "react";
import axios from "../utils/api";
import { 
    Trophy, 
    Video, 
    Search, 
    Bell, 
    ChevronRight, 
    Twitch, 
    Youtube, 
    Twitter,
    Home as HomeIcon,
    Calendar,
    Users,
    Monitor
} from 'lucide-react';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsRes = await axios.get("/events");
                const videosRes = await axios.get("/videos");
                setEvents(eventsRes.data || []);
                setVideos(videosRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="app-container">
            {/* Navigation is already implemented elsewhere */}
            
            <div className="content-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <h2 className="sidebar-title">
                        <Trophy className="icon" /> Categories
                    </h2>
                    <div className="categories-grid">
                        {["Shooter", "RPG", "MOBA", "Battle Royale", "Sports", "Strategy"].map((category) => (
                            <div key={category} className="category-card">
                                <span>{category}</span>
                                <ChevronRight className="arrow-icon" />
                            </div>
                        ))}
                    </div>
                    <div className="sidebar-footer">
                        <h3>Esports Hub</h3>
                        <p>The ultimate battleground for gamers...</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    {/* Featured Banner */}
                    <div className="featured-banner">
                        <h2>Global Esports Championship</h2>
                        <p>Live Now: Top Teams Battling for Glory</p>
                        <button className="watch-button">Watch Live</button>
                    </div>

                    {/* Events Section */}
                    <section className="events-section">
                        <div className="section-header">
                            <h2><Trophy className="icon" /> Latest Events</h2>
                            <a href="#">View All</a>
                        </div>
                        <div className="cards-grid">
                            {loading ? (
                                <div className="loader">Loading...</div>
                            ) : events.length > 0 ? (
                                events.map(event => (
                                    <div key={event.id} className="event-card">
                                        <h3>{event.title}</h3>
                                        <p>{event.description || 'Upcoming Tournament'}</p>
                                        <div className="card-footer">
                                            <span>Registration Open</span>
                                            <ChevronRight className="arrow-icon" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-items">No events available. Stay tuned!</p>
                            )}
                        </div>
                    </section>

                    {/* Videos Section */}
                    <section className="videos-section">
                        <div className="section-header">
                            <h2><Video className="icon" /> Latest Videos</h2>
                            <a href="#">View All</a>
                        </div>
                        <div className="cards-grid">
                            {loading ? (
                                <div className="loader">Loading...</div>
                            ) : videos.length > 0 ? (
                                videos.map(video => (
                                    <div key={video.id} className="video-card">
                                        <h3>{video.title}</h3>
                                        <p>{video.description || 'Gameplay Highlights'}</p>
                                        <div className="card-footer">
                                            <span>Trending</span>
                                            <ChevronRight className="arrow-icon" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-items">No videos available. Check back soon!</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>

        </div>
    );
};

export default Home;