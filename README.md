# eSports Hub
##Project Demo
## Google Drive Link

You can access the file [here](https://drive.google.com/file/d/1J4DJI19RjKroNaQFH1M46_QatJByygUu/view?usp=drive_link).
## Table of Contents
- [Team Name](#team-name)
- [Team Members](#team-members)
- [Individual Contributions](#individual-contributions)
- [Folder Structure](#folder-structure)
- [Approach](#approach)
- [Tech Stack](#tech-stack)
- [Build and Run Commands](#build-and-run-commands)

---

## Team Name
**CodeMasters**

---

## Team Members

1. **Vaishnavi Rivankar**
   - **Email**: vaishnavirivankar@gmail.com
   - **Contact Number**: 9923818361

2. **Valesha Gracias**
   - **Email**: valeshagracias29@gmail.com
   - **Contact Number**: 9518982556

3. **Dylen Fernandes**
   - **Email**: fernandesdylan104@gmail.com
   - **Contact Number**: 7447389347

---

## Individual Contributions

### **Dylen Fernandes**:
- **Role**: Backend Developer
- **Responsibilities**:
  - Developed and implemented user authentication system (login, register, profile management).
  - Set up and integrated MongoDB for data storage.
  - Built API endpoints for user profile updates, avatar uploads, video uploads, and live streaming functionality.
  - Implemented file handling for uploading and storing user avatars.

### **Vaishnavi Rivankar**:
- **Role**: Frontend Developer, UI/UX
- **Responsibilities**:
  - Implemented home page,videos page and dashboard including navbars, footers....
  - Created interactive features for gamers, such as uploading videos, managing live streams, and viewing achievements.

### **Valesha Gracias**:
- **Role**: Frontend Developer, UI/UX
- **Responsibilities**:
  - Worked on frontend, designed events page, login page, community page.
  - Added responsive features, active members in community, layout design ,video thumbnails...

---

## Folder Structure
```
eSports-Hub/
├── backend/                # Backend folder containing server-side code
│   ├── assets/             # For storing uploaded images, videos, etc.
│   ├── controllers/        # Controller files for handling routes
│   ├── models/             # Mongoose models for MongoDB collections
│   ├── routes/             # API routes (user, video, live streaming, etc.)
│   ├── utils/              # Utility functions (file handling, helpers)
│   ├── app.js              # Main backend entry point
│   ├── config.js           # Configuration file for environment variables
│   └── .env                # Environment variables for secret keys and DB connection
├── frontend/               # Frontend folder containing React app
│   ├── components/         # Reusable components (AvatarUploader, VideoCard, etc.)
│   ├── pages/              # Pages for each section (Profile, Home, etc.)
│   ├── context/            # Context for managing global state
│   ├── utils/              # Utility functions for API calls
│   ├── App.jsx             # Main React app entry point
│   ├── index.jsx           # React index file to render the app
│   └── styles/             # CSS files for styling
└── README.md               # Project documentation file
```
---

## Approach

Our approach to building the eSports Hub platform involves a **full-stack development** strategy, with a focus on delivering a seamless user experience for both gamers and organizers. The key steps taken are as follows:

1. **User Profile Management**:
   - Users can register and log in, selecting roles as either **gamer** or **organizer**.
   - Gamers and organizers can update their profiles (avatar, bio, username) and track their participation in tournaments/events.
   
2. **Avatar Upload**:
   - Users can upload an avatar that is stored in the backend (for now, stored locally in the assets folder).
   - We used **Multer** for handling file uploads and **MongoDB** to store the URL of the avatar in the user's profile.

3. **Video Upload and Management**:
   - Gamers can upload videos to showcase their gameplay. Videos are stored on the backend and associated with the user’s profile.
   - **Frontend** provides an easy interface for video upload, and the backend handles the storage.

4. **Live Streaming**:
   - Integrated a live streaming feature where gamers can start a stream.
   - Currently, we are exploring API integrations for live streaming (e.g., integrating a service like **Twitch** or a custom streaming solution).

5. **Payment Integration (Future)**:
   - We integrated **Razorpay** for handling payments in case of event participation fees (for organizers).
   
6. **Testing and Deployment**:
   - We have tested the frontend and backend using **Postman** for API testing and **React Developer Tools** for the frontend.
   - We have used **Vite** for fast bundling and building the frontend.

---

## Tech Stack

- **Frontend**:
  - React.js
  - CSS (Futuristic design)
  - Vite (for fast development)
  - Axios (for API calls)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Multer (for file uploads)

- **Authentication**:
  - No JWT used; instead, we use traditional session-based authentication for the time being.

- **Payment Gateway**:
  - Razorpay (dummy integration for handling payments)

- **Live Streaming**:
  - Exploring integration with **Twitch** API or custom solutions.

---

## Build and Run Commands

### Backend

1. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install

    Start Backend Server:

npm start

Backend Development: If you want to run the backend in development mode:

npm run dev

Backend Test Setup: If you have any tests in place (using Jest, for example):

    npm run test

Frontend

    Install Frontend Dependencies:

cd frontend
npm install

Start Frontend Development Server:

npm run dev

Build Frontend for Production:

npm run build

Frontend Test Setup: If you have any frontend tests:

    npm run test

License

This project is licensed under the MIT License - see the LICENSE file for details.


### Key Points:

1. **Team Name**: CodeMasters
2. **Team Members**: Vaishnavi Rivankar, Valesha Gracias, Dylen Fernandes
4. **Individual Contributions**: Describes what each person contributed to the project.
5. **Folder Structure**: Shows the layout of the project directory and the important folders and files.
6. **Approach**: Explains the method used for tackling the problem and building the project.
7. **Tech Stack**: Lists the technologies used throughout the project.
8. **Build and Run Commands**: Provides clear instructions for setting up and running both the frontend and backend.


