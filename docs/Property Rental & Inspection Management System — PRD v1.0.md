# Property Rental & Inspection Management System
### Product Requirements Document (PRD) — v1.0

**Project Type:** React Native Academic Project  
**Target Platform:** Android / Mobile  
**Primary Goal:** Build a practical property inspection application that demonstrates the required React Native, Expo, backend, API, database, camera, location, contacts, media, authentication, and UI/UX concepts from the provided project feature checklist.

---

# 1. Product Overview

The **Property Rental & Inspection Management System** is a mobile application designed for property owners, property managers, rental agents, or inspectors to manage properties and conduct structured property inspections.

Instead of treating inspection as a simple form, the application will organize an inspection **room-by-room and checklist-item-by-checklist-item**.

For example:

**2BHK Apartment**

**Living Room**
- ☑ Walls
- ☑ Flooring
- ☐ Windows
- ☑ Electrical

**Kitchen**
- ☑ Sink
- ☐ Cabinets
- ☑ Appliances

**Bedroom**
- ☑ Walls
- ☑ Flooring
- ☐ Fan

When an issue is found, the user can attach a **photo specifically to that checklist item**, add notes, and record its status.

This makes the application a genuine property-inspection system rather than a generic CRUD application.

---

# 2. Problem Statement

Property owners, rental agents, and inspectors often manage property information and inspection records using notebooks, spreadsheets, messaging applications, or disconnected photo galleries.

This creates several problems:

- Property information is difficult to organize.
- Inspection records may be inconsistent.
- Photos are not clearly associated with specific problems.
- Previous inspection history is difficult to retrieve.
- Tenant/owner contact information may be maintained separately.
- Property location and inspection evidence are not centralized.
- There is no structured room-by-room inspection workflow.

The proposed application solves this by providing a centralized mobile system where properties, contacts, inspection checklists, locations, notes, and photographic evidence can be managed together.

---

# 3. Product Goals

## Primary Goals

1. Allow users to securely register and log in.
2. Allow users to create and manage properties.
3. Allow properties to have rooms and predefined/custom inspection checklist items.
4. Allow users to conduct room-by-room inspections.
5. Allow each checklist item to have a status.
6. Allow photos to be captured against individual checklist items.
7. Allow inspection notes/issues to be recorded.
8. Store property and inspection locations.
9. Allow contacts to be created, managed, and linked to properties.
10. Store inspection history.
11. Provide a dashboard with useful summary information.
12. Demonstrate the majority of the provided React Native project checklist.

The provided checklist specifically covers React Native components, Expo Router, Camera, Location, Contacts, Media, Node/Express/MongoDB, REST APIs, authentication, networking, and UI/UX requirements. 
---

# 4. Target Users

## Property Owner

Uses the application to:

- Maintain properties.
- Manage tenant information.
- Conduct periodic inspections.
- Record property condition.
- Maintain inspection history.

## Property Manager / Rental Agent

Uses the application to:

- Manage multiple properties.
- Maintain tenant/owner contacts.
- Conduct inspections.
- Capture evidence of issues.
- Review previous inspection records.

## Inspector

Uses the application primarily to:

- Select a property.
- Perform room-by-room inspections.
- Mark checklist items.
- Capture evidence.
- Add notes.
- Submit the inspection.

---

# 5. Core User Journey

```text
Register
   ↓
Login
   ↓
Dashboard
   ↓
Add / Select Property
   ↓
View Property Details
   ↓
Start Inspection
   ↓
Select Room
   ↓
Inspect Checklist Items
   ↓
Mark Status
   ↓
Add Notes / Capture Photo
   ↓
Complete All Rooms
   ↓
Submit Inspection
   ↓
Inspection Summary
   ↓
Inspection History
```

---

# 6. Functional Requirements

## 6.1 Authentication Module

### Registration

User should be able to create an account using:

- Full name
- Email
- Password
- Confirm password

### Login

User should be able to log in using:

- Email
- Password

### Authentication

Backend should:

- Hash passwords.
- Generate JWT authentication tokens.
- Protect private API routes.
- Validate authentication tokens.

The checklist explicitly requires registration, login, password hashing, JWT authentication, protected routes, and token handling. 
### Logout

User can log out and the locally stored authentication token should be removed.

---

# 7. Dashboard Module

The dashboard provides a quick overview of the user's data.

Possible statistics:

- Total properties
- Active properties
- Total inspections
- Completed inspections
- Pending inspections
- Issues found

Example:

```text
Welcome, Mayank

Properties       8
Inspections     23
Pending          3
Issues Found    12
```

Dashboard can also show:

- Recently inspected properties
- Recent inspections
- Quick action buttons

---

# 8. Property Management Module

Users can manage their properties.

## Create Property

Fields:

- Property title
- Property type
- Address
- City
- Property description
- Number of bedrooms
- Number of bathrooms
- Rent amount
- Owner/tenant contact
- Property photos
- Location

Property types:

- Apartment
- House
- Villa
- Office
- Shop
- Other

## Property List

Display properties using `FlatList`.

Each property card can show:

- Property image
- Property name
- Type
- Location
- Rent
- Inspection status

## Property Details

Show:

- Property information
- Property images
- Location/map
- Linked contacts
- Inspection history
- Start Inspection button

## Property CRUD

User can:

- Create
- Read
- Update
- Delete

properties.

---

# 9. Room Management

Each property can contain multiple rooms.

Example:

```text
2BHK Apartment

├── Living Room
├── Kitchen
├── Master Bedroom
└── Bedroom 2
```

The user can select the relevant rooms when creating/configuring a property.

Possible predefined rooms:

- Living Room
- Kitchen
- Bedroom
- Bathroom
- Balcony
- Dining Room
- Garage
- Other

---

# 10. Inspection Module

This is the **core module of the application**.

An inspection belongs to a property.

```text
Property
   ↓
Inspection
   ↓
Rooms
   ↓
Checklist Items
   ↓
Status + Notes + Evidence
```

## Start Inspection

User selects:

- Property
- Inspection type
- Inspector
- Inspection date

Then the application creates an inspection.

---

# 11. Room-by-Room Inspection Checklist

Each room contains checklist items.

Example:

### Living Room

| Checklist Item | Status | Evidence |
|---|---|---|
| Walls | Passed | — |
| Flooring | Passed | — |
| Windows | Issue | 📷 |
| Electrical | Passed | — |

### Kitchen

| Checklist Item | Status | Evidence |
|---|---|---|
| Sink | Passed | — |
| Cabinets | Issue | 📷 |
| Appliances | Passed | — |

### Bedroom

| Checklist Item | Status | Evidence |
|---|---|---|
| Walls | Passed | — |
| Flooring | Passed | — |
| Fan | Issue | 📷 |

---

# 12. Checklist Item Status

Each item can have a status such as:

- Not Checked
- Passed
- Issue Found
- Not Applicable

The UI should make the current status visually clear.

For an item marked **Issue Found**, the user should be encouraged/required to provide:

- Issue description
- Photo evidence

---

# 13. Photo Evidence

A major feature of the application is the ability to associate media with a specific inspection item.

Example:

```text
Kitchen
   ↓
Cabinets
   ↓
Issue Found
   ↓
Take Photo
   ↓
Photo attached to "Kitchen → Cabinets"
```

The photo should not simply belong to the overall inspection.

It should maintain a relationship such as:

```text
Inspection
   ↓
Room
   ↓
Checklist Item
   ↓
Photo
```

This makes the inspection evidence meaningful.

The checklist requires camera permission, preview, capture, camera switching, flash/torch, zoom, autofocus, captured-image preview, retake, saving, and scanning-related capabilities.

---

# 14. Inspection Notes

Each checklist item can optionally contain notes.

Example:

```text
Item: Window

Status: Issue Found

Note:
"Window lock is damaged and does not close properly."

Photo:
[Captured Image]
```

---

# 15. Inspection Summary

After completing the inspection, the application should show a summary.

Example:

```text
Inspection Completed

Property:
Green Residency - Flat 302

Rooms Inspected: 4

Total Items: 28
Passed: 23
Issues: 5
Not Applicable: 0

Photos Captured: 7
```

The user can then submit/save the inspection.

---

# 16. Inspection History

Users can view previous inspections for a property.

Each inspection record should contain:

- Inspection date
- Property
- Inspector
- Completion status
- Number of issues
- Number of photos

Selecting an inspection opens the complete inspection details.

---

# 17. Contacts Module

Contacts are used for:

- Property owners
- Tenants
- Rental agents
- Inspectors
- Other relevant people

The application should support:

- Request contacts permission.
- Retrieve device contacts.
- Display contacts using `FlatList`.
- Search/filter contacts.
- View contact details.
- Create a contact.
- Edit a contact.
- Delete a contact.
- Link a contact to a property.
- Call/contact a person using the device application.

These requirements directly correspond to the Contacts section of the provided checklist.

Example:

```text
Property
Green Residency - Flat 302

Tenant
Rahul Patel

[Call] [Message]
```

---

# 18. Location Module

Property location should be stored using device location functionality.

Features:

- Request foreground location permission.
- Get current location.
- Capture latitude.
- Capture longitude.
- Display property on a map.
- Display marker.
- Move map to current location.
- Reverse geocode coordinates into an address.
- Allow location search/selection.
- Handle location permission/service errors.

These requirements are explicitly represented in the Location section of the checklist.

---

# 19. Media Module

The application should support:

- Pick image from gallery.
- Upload image.
- Display uploaded image.
- Compress/resize images where appropriate.
- Validate media.
- Show upload/loading state.
- Handle upload errors.

The checklist specifically requires gallery selection, image upload/display, compression/resizing, video upload, media validation, and upload loading states.

For the core 7-day implementation, **image evidence is the priority**.

Video support can be treated as an additional feature if time permits.

---

# 20. Search & Filtering

Users should be able to search/filter:

### Properties

- Property name
- Type
- Location

### Contacts

- Name
- Phone
- Email

### Inspections

- Property
- Date
- Status

The checklist includes search/filtering and pagination as UI/UX requirements.

---

# 21. API Requirements

The mobile application communicates with the Express backend through REST APIs.

Architecture:

```text
React Native
      ↓
HTTP / Axios
      ↓
Express REST API
      ↓
Service Layer
      ↓
Repository / Mongoose
      ↓
MongoDB
```

Required HTTP operations:

- GET
- POST
- PUT/PATCH
- DELETE

The checklist explicitly requires REST APIs and these HTTP operations. 
---

# 22. Suggested API Endpoints

## Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

## Properties

```text
GET    /api/v1/properties
GET    /api/v1/properties/:id
POST   /api/v1/properties
PATCH  /api/v1/properties/:id
DELETE /api/v1/properties/:id
```

## Inspections

```text
GET    /api/v1/inspections
GET    /api/v1/inspections/:id
POST   /api/v1/inspections
PATCH  /api/v1/inspections/:id
DELETE /api/v1/inspections/:id
```

## Inspection Items

```text
PATCH  /api/v1/inspections/:id/items/:itemId
POST   /api/v1/inspections/:id/items/:itemId/media
```

## Contacts

```text
GET    /api/v1/contacts
GET    /api/v1/contacts/:id
POST   /api/v1/contacts
PATCH  /api/v1/contacts/:id
DELETE /api/v1/contacts/:id
```

## Media

```text
POST   /api/v1/media/upload
DELETE /api/v1/media/:id
```

---

# 23. Database Design

The database will use **MongoDB**.

Main collections:

```text
users
properties
contacts
inspections
media
```

## User

```text
User
├── name
├── email
├── passwordHash
├── role
├── createdAt
└── updatedAt
```

## Property

```text
Property
├── owner
├── title
├── type
├── description
├── address
├── location
├── rent
├── rooms
├── contacts
├── images
├── createdAt
└── updatedAt
```

## Contact

```text
Contact
├── user
├── name
├── phone
├── email
├── role
├── linkedProperties
├── createdAt
└── updatedAt
```

## Inspection

```text
Inspection
├── property
├── inspector
├── date
├── status
├── rooms
│   ├── roomName
│   └── checklistItems
│       ├── name
│       ├── status
│       ├── notes
│       └── media
├── location
├── summary
├── createdAt
└── updatedAt
```

## Media

```text
Media
├── user
├── inspection
├── room
├── checklistItem
├── type
├── url
├── metadata
├── createdAt
└── updatedAt
```

---

# 24. Navigation Structure

Expo Router will be used for file-based routing.

The checklist explicitly requires file-based routing, Stack navigation, Tab navigation, dynamic routes, route parameters, `router.push()`, `router.replace()`, `router.back()`, `Link`, and protected/auth routes.

Proposed navigation:

```text
                    Root
                     │
          ┌──────────┴──────────┐
          │                     │
       (auth)                  (app)
          │                     │
    Login/Register           Dashboard
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
         Properties        Inspections        Contacts
              │                 │                 │
        Property Detail    Inspection Detail   Contact Detail
              │                 │
        Start Inspection    Room
                                │
                         Checklist Item
                                │
                             Camera
```

---

# 25. UI/UX Requirements

The application should include:

- Clean mobile UI.
- Reusable components.
- Consistent spacing and typography.
- Loading indicators.
- Empty states.
- Error states.
- Permission-denied states.
- Form validation.
- Pull-to-refresh.
- Search/filtering.
- Confirmation dialogs.
- Toast/alert notifications.
- Logout.
- Dark/light theme if time permits.

These are directly represented in the UI/UX section of the checklist.

---

# 26. React Native Concepts Demonstrated

The project should intentionally demonstrate the required React Native concepts:

### Components

- View
- Text
- Image
- Pressable
- TextInput
- ScrollView
- FlatList
- Modal
- ActivityIndicator
- SafeAreaView

### React

- useState
- useEffect
- Props
- Reusable components
- Conditional rendering
- Event handling
- `onChangeText`
- `map()` vs `FlatList`

These are part of the provided checklist. 
---

# 27. Backend Requirements

Backend technology:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Password hashing
- REST APIs
- Middleware
- Request validation
- Error handling
- Environment variables
- Multipart/form-data

The checklist specifically requires Node.js/Express setup, MongoDB connection, REST APIs, authentication, CRUD, media storage, validation, error handling, environment variables, and React Native-to-backend integration.

---

# 28. Error Handling

The application should handle:

### Frontend

- Network errors
- Invalid forms
- Empty data
- API errors
- Camera permission denial
- Location permission denial
- Gallery permission denial
- Upload failures

### Backend

- Invalid requests
- Unauthorized requests
- Resource not found
- Duplicate email
- Invalid ObjectId
- Database errors
- File upload errors
- Validation errors

---

# 29. Security Requirements

Minimum security implementation:

- Passwords must never be stored as plain text.
- Password hashing must be used.
- JWT authentication must protect private APIs.
- Authentication token must be securely stored on the device.
- Protected routes must reject unauthenticated requests.
- Environment variables must store secrets.
- Request data must be validated.

---

# 30. Non-Functional Requirements

## Performance

- Use `FlatList` for large lists.
- Avoid unnecessary API calls.
- Show loading indicators.
- Compress large images where possible.

## Reliability

- Handle network failures gracefully.
- Prevent application crashes from denied permissions.
- Validate user input.

## Maintainability

- Feature/module-based frontend architecture.
- Modular backend architecture.
- Reusable components.
- Centralized API handling.
- Centralized error handling.

## Usability

A user should be able to start an inspection and understand the workflow without technical knowledge.

---

# 31. Out of Scope for v1

To keep the project achievable within the academic deadline, the following are **not mandatory**:

- Online payment
- Advanced accounting
- ERP functionality
- CRM functionality
- Tenant rent collection
- Complex financial reports
- AI-based damage detection
- Cloud infrastructure
- Real-time collaboration
- Advanced role/permission management
- Production-scale distributed architecture

These can become future extensions.

---

# 32. Future Enhancements

After the academic version, the system can evolve into a larger property-management SaaS.

Possible future modules:

```text
Property Management
        ↓
Inspection Management
        ↓
Tenant Management
        ↓
Rent Management
        ↓
Maintenance Management
        ↓
Expense Management
        ↓
Reports & Analytics
        ↓
Property Management ERP
```

Potential advanced features:

- Digital inspection reports
- PDF report generation
- Tenant portal
- Maintenance requests
- Rent reminders
- Payment integration
- Notifications
- Cloud storage
- Advanced analytics
- AI-powered damage detection
- Multi-user teams
- Role-based access control

---

# 33. 7-Day MVP Plan

Because the project has a **7-day academic deadline**, implementation should be prioritized.

## Day 1 — Foundation

- Project setup
- Expo Router
- Navigation
- Backend setup
- MongoDB connection
- Environment variables
- Basic reusable UI components

## Day 2 — Authentication

- Registration
- Login
- Password hashing
- JWT
- Protected routes
- Secure token storage
- Logout

## Day 3 — Properties & Contacts

- Property CRUD
- Property list/detail
- Contact CRUD
- Device contacts
- Search/filter

## Day 4 — Inspection Core

- Create inspection
- Room structure
- Checklist items
- Item status
- Notes
- Inspection progress

## Day 5 — Camera & Location

- Camera permission
- Camera preview
- Capture photo
- Retake
- Attach photo to checklist item
- Location permission
- Current location
- Map
- Marker

## Day 6 — Media, Dashboard & UX

- Image upload
- Image display
- Dashboard
- Inspection history
- Loading states
- Error states
- Empty states
- Form validation
- Pull-to-refresh
- Alerts/toasts

## Day 7 — Testing & Viva Preparation

- Test complete user flow
- Fix bugs
- Test permissions
- Test API errors
- Test authentication
- Test CRUD
- Test camera/location
- Clean UI
- Prepare architecture explanation
- Prepare viva questions

---

# 34. MVP Definition

The project is considered complete when a user can perform this complete workflow:

```text
Register
   ↓
Login
   ↓
Create Property
   ↓
Add/Link Contact
   ↓
Set Property Location
   ↓
Start Inspection
   ↓
Select Room
   ↓
Check Checklist Item
   ↓
Mark "Issue Found"
   ↓
Add Note
   ↓
Capture Photo
   ↓
Photo linked to that exact item
   ↓
Inspect remaining rooms
   ↓
Complete Inspection
   ↓
View Inspection Summary
   ↓
View Inspection History
```

**This workflow is the core demonstration for the final viva.**

---

# 35. Feature Checklist Coverage

The project is specifically designed around the supplied checklist.

| Checklist Area | Planned Coverage |
|---|---|
| Core React Native | ✅ |
| Expo Router | ✅ |
| Stack navigation | ✅ |
| Tab navigation | ✅ |
| Dynamic routes | ✅ |
| Protected routes | ✅ |
| Camera | ✅ |
| Photo capture | ✅ |
| Image preview/retake | ✅ |
| Location | ✅ |
| Map | ✅ |
| Marker | ✅ |
| Reverse geocoding | ✅ |
| Contacts | ✅ |
| Contact CRUD | ✅ |
| Device contacts | ✅ |
| Image/media | ✅ |
| Upload | ✅ |
| Node.js | ✅ |
| Express | ✅ |
| MongoDB | ✅ |
| REST APIs | ✅ |
| Registration/Login | ✅ |
| Password hashing | ✅ |
| JWT | ✅ |
| Protected APIs | ✅ |
| CRUD | ✅ |
| Validation | ✅ |
| Error handling | ✅ |
| Axios/fetch | ✅ |
| Multipart upload | ✅ |
| Token handling | ✅ |
| Dashboard | ✅ |
| Search/filter | ✅ |
| Local persistence | ✅ |
| Secure token storage | ✅ |
| Reusable components | ✅ |
| Custom hooks | ✅ |
| Loading/error states | ✅ |
| Permissions | ✅ |
| Camera lifecycle | ✅ |
| Location watcher/cleanup | Optional |
| Video recording/upload | Optional |
| Pagination | Optional |
| Advanced camera controls | Optional |

The mapping above is based on the supplied five-page checklist; the checklist itself does not specify which features are mandatory versus optional, so the “Optional” designation is a project-scope decision rather than something stated by the checklist.

---

# 36. Success Criteria

The project will be considered successful if:

1. A user can register and authenticate.
2. A user can create and manage properties.
3. A user can manage and link contacts.
4. A user can locate a property on a map.
5. A user can start an inspection.
6. An inspection is divided into rooms.
7. Each room contains checklist items.
8. Checklist items can be marked with different statuses.
9. Issues can contain notes.
10. A photo can be captured specifically against a checklist item.
11. Inspection data is persisted in MongoDB.
12. The complete data flow works:

```text
React Native
      ↓
REST API
      ↓
Express
      ↓
Service / Repository
      ↓
MongoDB
```

13. Loading, error, validation, and permission states are handled.
14. The application demonstrates the required React Native concepts from the provided checklist.

---

# 37. Final Product Positioning

### Project Name

**Property Inspection & Rental Management System**

### One-Line Description

> A mobile application that helps property owners, managers, and inspectors conduct structured room-by-room property inspections, record checklist results, capture photographic evidence against specific inspection items, and centrally manage property, contact, location, and inspection information.

### Core Differentiator

**Evidence-based room-by-room inspection.**

The application does not merely store:

> “Kitchen has an issue.”

It stores:

> **Property → Kitchen → Cabinets → Issue Found → Note → Photo Evidence → Inspection Date**

That is what makes the project feel like a **real property-inspection application rather than a simple CRUD application.**