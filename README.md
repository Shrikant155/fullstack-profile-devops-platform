# Full-Stack Profile & DevOps Platform

A containerized full-stack user profile application built with **Java 21**, **Spring Boot**, **React**, **MongoDB**, and **Redis**, instrumented with **OpenTelemetry**, **Jaeger**, **Grafana Loki**, and **Spring Boot Actuator**, and orchestrated using **Docker Compose**.

## Architecture & Tech Stack

- **Backend:** Java 21, Spring Boot 4, Spring WebMVC, Spring Data MongoDB, Spring Data Redis & Spring Cache, Jakarta Validation, Spring Boot Actuator, Micrometer Prometheus, OpenTelemetry, Springdoc OpenAPI (Swagger UI), JaCoCo
- **Frontend:** React, Vite, Tailwind CSS, PostCSS
- **Database & Caching:** MongoDB (`profile_db`), Redis
- **Observability & Monitoring:** Grafana, Loki, Jaeger
- **Containerization:** Docker, Docker Compose

## Services & Ports

| Service | Container Name | Host Port | Container Port | Endpoint / URL |
| :--- | :--- | :--- | :--- | :--- |
| Frontend (React) | `react-frontend` | `5173` | `5173` | `http://localhost:5173` |
| Backend (Spring Boot) | `spring-react-backend` | `8081` | `8081` | `http://localhost:8081` |
| Swagger / OpenAPI Docs | `spring-react-backend` | `8081` | `8081` | `http://localhost:8081/swagger-ui.html` |
| Actuator Health & Metrics | `spring-react-backend` | `8081` | `8081` | `http://localhost:8081/actuator` |
| Grafana | `grafana-server` | `3001` | `3000` | `http://localhost:3001` |
| Jaeger UI | `jaeger-server` | `16686` | `16686` | `http://localhost:16686` |
| Jaeger OTLP Collector | `jaeger-server` | `4318` | `4318` | `http://localhost:4318` |
| Loki | `loki-server` | `3100` | `3100` | `http://localhost:3100` |
| MongoDB | `mongo-server` | `27017` | `27017` | `mongodb://localhost:27017/profile_db` |
| Redis | `redis-server` | `6379` | `6379` | `localhost:6379` |

## Project Structure

```text
fullstack-profile-devops-platform/
 backend/                # Java 21 + Spring Boot REST API, Redis cache, OpenTelemetry & Loki integration
     Dockerfile
     pom.xml
     src/
 frontend/               # React + Vite + Tailwind CSS client application
   Dockerfile
   package.json
   src/
 docker-compose.yaml     # Multi-container orchestration & bridge network (react-network)
 .gitignore


