# Overview

The Change Readiness Assessment is a Vue 3-based single-page application designed to evaluate organizational readiness for change initiatives. The application guides users through a structured assessment process across multiple stages: role selection, context gathering, diagnosis, reflection, planning, and export. It provides a comprehensive framework for measuring change readiness factors such as leadership commitment, organizational culture, communication effectiveness, and resource availability. The application generates detailed reports in PDF, CSV, and JSON formats to help organizations understand their change readiness and develop actionable improvement plans.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application is built using Vue 3 with the Composition API and follows a component-based architecture. It uses Vue Router for navigation between assessment stages and Pinia for centralized state management. The routing system implements step-based navigation with guards to ensure users complete stages in sequence. The UI is styled with custom CSS using modern design principles including gradients, shadows, and responsive layouts.

## State Management
Pinia serves as the primary state store, managing assessment data, user progress, role selection, and metadata. The store implements persistent storage using localStorage to maintain user progress across browser sessions. The state structure includes separate sections for context, diagnosis, reflection, planning, and metadata tracking.

## Assessment Data Structure
The application uses a modular question system where assessment questions are organized by categories (leadership, culture, communication, etc.) with configurable scoring scales. Questions adapt based on user role selection, providing role-specific assessment experiences. The data structure supports both quantitative scoring and qualitative responses.

## Export and Reporting
The system implements multiple export formats using client-side libraries. PDF generation is handled by jsPDF for formatted reports, CSV export uses PapaParse for data analysis compatibility, and JSON export provides raw data access. The export system generates comprehensive reports including assessment scores, recommendations, and planning outputs.

## Build System
Vite serves as the build tool and development server, configured with Vue plugin support and path aliasing. The development server is configured to run on all interfaces (0.0.0.0) on port 5000 for deployment flexibility. Hot module replacement is enabled for efficient development workflows.

# External Dependencies

## Core Framework Dependencies
- **Vue 3.5.18**: Main frontend framework using Composition API
- **Vue Router 4.5.1**: Client-side routing and navigation
- **Pinia 3.0.3**: State management and persistence
- **Vite 7.1.0**: Build tool and development server

## Third-party Libraries
- **jsPDF 3.0.1**: Client-side PDF generation for assessment reports
- **PapaParse 5.4.1**: CSV parsing and generation for data export
- **Inter Font (Google Fonts)**: Typography and design consistency
- **Feather Icons**: Icon library for UI elements

## Development Tools
- **@vitejs/plugin-vue 6.0.1**: Vue single-file component support for Vite

The application is designed as a fully client-side solution with no backend dependencies, making it easily deployable to static hosting platforms while maintaining all functionality through browser-based libraries and localStorage persistence.