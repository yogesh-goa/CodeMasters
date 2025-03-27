import { useEffect, useState } from "react";
import axios from "../utils/api";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsRes = await axios.get("/events/latest");
                const videosRes = await axios.get("/videos/latest");

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
        <div className="bg-[#18181b] text-white min-h-screen p-6 flex">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-purple-400 border-b-2 border-purple-500 pb-2">Categories</h2>
                <ul className="mt-4 space-y-2">
                    {["Shooter", "RPG", "MOBA", "Battle Royale", "Sports", "Strategy"].map((category, index) => (
                        <li key={index} className="bg-gray-800 p-2 rounded-lg shadow hover:bg-gray-700 cursor-pointer">
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="w-3/4 pl-6">
                {/* Navigation Bar */}
                <nav className="flex justify-between items-center mb-6 p-4 bg-gray-900 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-purple-400">Esports Hub</h1>
                    <input type="text" placeholder="Search..." className="p-2 rounded-lg bg-gray-800 text-white" />
                    <div className="flex space-x-4">
                        <button className="p-2 bg-purple-600 rounded-lg">Sign In</button>
                        <span className="p-2 bg-gray-800 rounded-lg">🔔</span>
                    </div>
                </nav>

                {/* Featured Banner */}
                <div className="bg-purple-600 p-6 text-center rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold">Trending Esports Event</h2>
                    <button className="mt-2 bg-gray-800 px-4 py-2 rounded-lg">Live Now</button>
                </div>

                {loading ? (
                    <p className="text-gray-300 text-center">Loading...</p>
                ) : (
                    <>
                        {/* Latest Events Section */}
                        <section className="mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold border-b-4 border-purple-500 pb-2">Latest Events</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                {events.length > 0 ? (
                                    events.map((event) => (
                                        <div key={event._id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                            <p className="text-lg font-semibold">{event.title}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-300 text-center p-4 bg-gray-800 rounded-lg">No events available. Stay tuned for upcoming tournaments!</p>
                                )}
                            </div>
                        </section>

                        {/* Latest Videos Section */}
                        <section className="mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold border-b-4 border-blue-500 pb-2">Latest Videos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                {videos.length > 0 ? (
                                    videos.map((video) => (
                                        <div key={video._id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                                            <p className="text-lg font-semibold">{video.title}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-300 text-center p-4 bg-gray-800 rounded-lg">No videos uploaded yet. Check back later!</p>
                                )}
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="mt-8 bg-gray-900 p-4 rounded-lg text-center text-gray-400">
                            <p>&copy; 2025 Esports Hub. All Rights Reserved.</p>
                            <div className="flex justify-center space-x-4 mt-2">
                                <a href="#" className="hover:text-purple-400">About Us</a>
                                <a href="#" className="hover:text-purple-400">Contact</a>
                                <a href="#" className="hover:text-purple-400">Privacy Policy</a>
                                <a href="#" className="hover:text-purple-400">Terms & Conditions</a>
                            </div>
                        </footer>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
