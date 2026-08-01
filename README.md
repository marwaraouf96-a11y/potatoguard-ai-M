# 🥔 PotatoGuard AI

An AI-assisted web platform for potato leaf disease screening, research presentation, and transparent agricultural decision support.

🔗 **Live Website:**  
https://potatoguard-ai-marwa.vercel.app

---

## Overview

PotatoGuard AI is an academic graduation project designed to support the early screening of potato leaf diseases using deep learning.

The project combines:

- A deep learning research pipeline for image classification.
- A responsive bilingual web application.
- User authentication and profile management.
- Research methodology and evaluation pages.
- A future-ready interface for model deployment and explainable predictions.

The platform is intended as an AI-assisted screening tool and not as a replacement for professional agricultural or laboratory diagnosis.

---

## Current Project Status

The web application is currently deployed and publicly available.

The current version includes the complete frontend, authentication system, profile management, bilingual interface, and research presentation.

The trained deep learning model has been evaluated separately in the associated research notebook. Direct production inference from the website will be integrated in a future deployment stage.

---

## Deep Learning Model

The research compared multiple transfer-learning architectures, including:

- EfficientNetB3
- ConvNeXtTiny

The final selected architecture was:

**ConvNeXtTiny**

The classification system supports seven categories:

1. Bacteria
2. Fungi
3. Healthy
4. Nematode
5. Pest
6. Phytophthora
7. Virus

The model pipeline includes image preprocessing, class-weight handling, training, evaluation, and model selection.

---

## Main Features

- Modern responsive user interface.
- English and Arabic language support.
- User registration and sign-in.
- User profile management.
- Protected dashboard pages.
- Potato leaf image upload interface.
- Research methodology and findings pages.
- Transparent prediction-oriented design.
- Supabase authentication and database integration.
- Public deployment using Vercel.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- CSS
- Figma Make

### Backend and Database

- Supabase Authentication
- Supabase PostgreSQL Database
- Supabase Row Level Security

### Deployment

- GitHub
- Vercel

### Machine Learning Research

- Python
- TensorFlow
- Keras
- ConvNeXtTiny
- EfficientNetB3
- Transfer Learning
- Deep Learning

---

## Project Structure

```text
potatoguard-ai-M/
├── src/                         # React application source code
├── supabase/functions/server/   # Supabase server functions
├── utils/supabase/              # Supabase frontend configuration
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
