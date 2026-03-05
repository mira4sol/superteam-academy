# Content Management System Guide

Superteam Academy features a robust, dual-dashboard approach for managing course content. Authorized individuals and administrators can choose the environment that best fits their workflow.

## Management Interfaces

1. **Custom Admin Dashboard (`/admin`)**
   A streamlined, user-friendly interface built directly into the Next.js frontend. It is designed to make creating, editing, and publishing courses as simple and quick as possible, directly within the academy's native UI.

2. **Payload CMS Dashboard**
   The underlying headless CMS admin panel. This interface provides complete, granular database control over all collections (Users, Courses, Modules, Lessons, Media), making it ideal for deep structural edits or advanced data management.

## Content Schema

The educational content is structured hierarchically to ensure a logical learning flow:

- **Courses**: The top-level syllabus. Defines the umbrella topic, overarching description, prerequisites, total XP rewards, and primary learning outcomes.
- **Modules**: Sub-sections grouping related lessons within a specific Course. They dictate the major milestones of a course.
- **Lessons**: The atomic units of learning. They sit inside Modules and define a specific topic, the estimated time to complete, and the difficulty level.
- **Lesson Contents**: The actual educational material tied to a Lesson. This includes Lexical rich-text blocks, embedded images, code snippets, and interactive elements.

## How to Create and Edit Courses

Whether you are using the Custom Admin Dashboard or the Payload CMS interface, the logical flow for content creation remains the same:

1. **Initialize the Course**
   Create a new Course record. Fill out the title, description, and link preliminary metadata (like thumbnails or tags). Leave the status as "Draft" while you work.

2. **Build the Skeleton (Modules)**
   Create Modules and link them to your new Course. Assign each module an explicit numerical order (e.g., 1, 2, 3) to outline the curriculum structure.

3. **Flesh out the Lessons**
   Create Lessons and attach them to their respective Modules. Define the XP reward for completion and set the sequence order within the module.

4. **Author the Content**
   Use the **Lesson Contents** collection/interface to write the actual material. The rich-text editor supports formatting, media embedding, and code blocks to create engaging educational experiences.

## Publishing Workflow

We follow a strict, dual-state publishing model to ensure no unfinished content is visible to learners.

- **Draft State**: By default, newly created courses and lessons should be set to "Draft". In this state, the content is securely saved in the database but is completely hidden from the public-facing API and frontend UI. This allows creators to preview and construct courses over time.
- **Published State**: Once a course is fully QA'd and ready for learners, an administrator changes its status to "Published". Because the Next.js frontend is wired directly to Payload's data layer, the course instantly becomes visible and enrollable on the live platform.

> **Note**: Both admin dashboards enforce proper role-based authentication. Ensure you are logged in with the appropriate administrative credentials to access editing and publishing capabilities.
