# E-Likita Hospital Consultation Assistant Backend

Welcome to the backend of the E-Likita Hospital Consultation Assistant. This application provides a guided triage process to help users assess their symptoms and receive AI-powered healthcare recommendations.

## Key Features

- **Patient Management**: Create and manage patient records.
- **Guided Consultations**: A multi-step process to guide users through a consultation.
- **Symptom Assessment**: Collect and analyze user symptoms, duration, and severity.
- **AI-Powered Medical Analysis**: Utilizes Google's Gemini model to provide intelligent risk assessments and care recommendations based on patient data.
- **Consultation Summary**: Generate a comprehensive summary of the consultation, including patient information, symptoms, AI-powered risk assessment, and recommendations.

## Technology Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: A cross-platform document-oriented database program.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **Google AI SDK**: For integrating with Google's Gemini models to provide generative AI features.
- **Zod**: For schema declaration and validation, ensuring robust data structures.
- **Express-Validator**: Middleware for request data validation.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **MongoDB**: Make sure you have a MongoDB server running, either locally or on a cloud service like MongoDB Atlas.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/Elmoustafi-22/e-likita-backend.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd e-likita-backend
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root of the project.
2.  Add the following environment variables to the `.env` file:

    ```
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    GOOGLE_API_KEY=your_google_ai_api_key
    ```

    Replace the values with your specific MongoDB connection string and Google AI API key.

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default is 5000).

## API Documentation

### Patients API

-   **`POST /api/patients`**: Create a new patient.
-   **`GET /api/patients`**: Get all patients.
-   **`GET /api/patients/:id`**: Get a patient by ID.

### Consultations API

-   **`POST /api/consultations`**: Create a new consultation.
-   **`GET /api/consultations`**: Get all consultations.
-   **`GET /api/consultations/:id`**: Get a consultation by ID.
-   **`PUT /api/consultations/:id`**: Update a consultation.
-   **`POST /api/consultations/:id/symptoms`**: Add symptoms to a consultation.
-   **`POST /api/consultations/:id/follow-ups`**: Add follow-up answers to a consultation.
-   **`GET /api/consultations/:id/summary`**: Generate and get the AI-powered consultation summary.

## Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Express controllers for handling request logic
├── middlewares/    # Custom middlewares (e.g., validation)
├── models/         # Mongoose models and schemas
├── routes/         # Express routes
├── services/       # Business logic and services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Main application entry point
```

## AI Integration

This application leverages Google's Gemini model via the Vercel AI SDK to provide intelligent medical insights. When a consultation summary is generated, the backend service sends the patient's symptoms, pain level, and medical history to the AI.

The AI then provides:
- A **Risk Assessment** (low, medium, or high).
- **Key Factors** that influenced its assessment.
- Actionable **Recommendations** and **Next Steps**.

This AI-powered analysis enhances the quality of the triage process, offering more nuanced and data-driven guidance to the user. The system is designed with a fallback mechanism to provide rule-based suggestions if the AI service is unavailable.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.