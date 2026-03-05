# Content Management System Guide

Onchain Academy runs on Payload CMS, accessible locally at `/admin` (e.g., `http://localhost:3000/admin`). The CMS manages all course content, user profiles, and platform configuration.

## Content Schema Overview

To build an educational flow, content is organized hierarchically:

1. **Courses**: The top-level curriculum. Defines the title, description, prerequisites, and learning outcomes.
2. **Modules**: Sections within a Course. Used to group related lessons.
3. **Lessons**: Individual topics within a Module.
4. **Lesson Contents**: The actual educational material (text, code blocks, images) inside a Lesson.

## How to Create a New Course

Follow these steps to structure a course:

1. **Create the Course**

   - Navigate to the **Courses** collection.
   - Click "Create New".
   - Fill in the required fields (Title, Slug, Language, Description).
   - Set the status to "Published" or "Draft" depending on your readiness.

2. **Create Modules**

   - Navigate to the **Modules** collection.
   - Create a module and link it to the previously created Course.
   - Assign an order (e.g., 1 for the first module).

3. **Create Lessons**

   - Navigate to the **Lessons** collection.
   - Input the lesson details and set the difficulty level.
   - Select the parent Module.
   - Set the order for where it belongs in the module sequence.

4. **Add Lesson Content**
   - Navigate to the **Lesson Contents** collection.
   - Choose the parent Lesson.
   - Enter your instructional content into the Lexical rich text editor. This editor allows for formatting, inserting images, and embedding code snippets.

## Publishing Workflow

We follow a simple Draft-to-Publish workflow.

- **Draft State**: Content is saved in the database but will not be fetched by the frontend user-facing API. Use this state when building out lessons or reviewing changes.
- **Published State**: The content becomes live.

> **Tip:** You can edit content directly in the CMS. Changes will reflect on the platform for users immediately after saving a published document.
