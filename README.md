# E-Likita Hospital Consultation Assistant Backend

Welcome to the backend of the E-Likita Hospital Consultation Assistant. This application provides a guided triage process to help users assess their symptoms and receive healthcare recommendations.

## Key Features

- **Patient Management**: Create and manage patient records.
- **Guided Consultations**: A multi-step process to guide users through a consultation.
- **Symptom Assessment**: Collect and analyze user symptoms, duration, and severity.
- **Risk Analysis**: A (placeholder) system to assess health risks based on symptoms.
- **Personalized Recommendations**: Generate recommendations and next actions based on the risk assessment.

## Technology Stack

- **Node.js**: JavaScript runtime environment.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: A cross-platform document-oriented database program.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **Express-Validator**: Middleware for request data validation.
- **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file.

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
    ```

    Replace `your_mongodb_connection_string` with the connection string for your MongoDB database.

### Running the Application

To start the development server, run:

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default is 5000).

## API Documentation

### Patients API

-   **`POST /api/patients`**: Create a new patient.
    -   **Body**:
        ```json
        {
            "fullName": "John Doe",
            "age": 30,
            "gender": "male",
            "phone": "+1234567890",
            "medicalHistory": ["Asthma"],
            "knownAllergies": ["Pollen"],
            "currentMedications": ["Ventolin"]
        }
        ```

-   **`GET /api/patients`**: Get all patients.
-   **`GET /api/patients/:id`**: Get a patient by ID.

### Consultations API

-   **`POST /api/consultations`**: Create a new consultation.
    -   **Body**:
        ```json
        {
            "patient": "patient_id"
        }
        ```

-   **`GET /api/consultations`**: Get all consultations.
-   **`GET /api/consultations/:id`**: Get a consultation by ID.

-   **`POST /api/consultations/:id/symptoms`**: Add symptoms to a consultation.
    -   **Body**:
        ```json
        {
            "symptoms": [
                {
                    "symptoms": ["Fever", "Cough"],
                    "duration": "3 days",
                    "severity": 5,
                    "additionalDetails": "Mild cough"
                }
            ]
        }
        ```

-   **`POST /api/consultations/:id/follow-ups`**: Add follow-up answers to a consultation.
    -   **Body**:
        ```json
        {
            "followUps": [
                {
                    "question": "Where is the pain located?",
                    "answer": "lower-left"
                }
            ]
        }
        ```

-   **`GET /api/consultations/:id/summary`**: Generate and get the consultation summary.

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
└── index.ts        # Main application entry point
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.