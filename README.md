# Job Application Tracker

![Status](https://img.shields.io/badge/status-in%20development-orange) 🚧

A personal job application tracking tool focused on clarity, follow-ups, and low friction.

Built as a local-first application using a [Rails](https://rubyonrails.org/) API backend and a [Next.js](https://nextjs.org/) frontend.

## Purpose

This project exists to replace spreadsheet or other notes app based job tracking with a purpose-built tool that answers one primary question:

**What should I follow up on next?**

The initial version is intentionally simple and opinionated.

## Features (v1)

- Create, update, and delete job applications
- Track application status (applied, interview, offer, rejected, withdrawn)
- Set and monitor follow-up dates
- Highlight overdue and upcoming follow-ups
- Search applications by company or role
- Sort by applied date, follow-up date, or company name

## Tech Stack

- **Backend:** [Rails API](https://rubyonrails.org/)
- **Frontend:** [Next.js](https://nextjs.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Environment:** Local-first (v1)

## Project Structure

```
job-tracker/
├── job-tracker-api/   # Rails API backend
├── job-tracker-web/   # Next.js frontend
└── README.md
```

## Scope & Non-Goals (v1)

Out of scope for the first version:

- User accounts or authentication
- Email or calendar integrations
- Job scraping or autofill
- Attachments (CVs, cover letters)
- Kanban boards or analytics dashboards

*These may be considered in later versions.*

## Status

🚧 **In active development**
Version 1 is focused on correctness, usability, and finishing the core workflow.