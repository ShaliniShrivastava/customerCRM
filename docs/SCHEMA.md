# Database Schema

CustomerCRM uses MongoDB with Mongoose.

## User

| Field     | Type    | Required | Description       |
| --------- | ------- | -------- | ----------------- |
| name      | String  | Yes      | User name         |
| email     | String  | Yes      | Unique email      |
| password  | String  | Yes      | Hashed password   |
| role      | String  | Yes      | `user` or `admin` |
| isBlocked | Boolean | No       | User block status |
| createdAt | Date    | Auto     | Creation time     |
| updatedAt | Date    | Auto     | Last update time  |

## Lead

| Field            | Type     | Required | Description                     |
| ---------------- | -------- | -------- | ------------------------------- |
| name             | String   | Yes      | Customer name                   |
| email            | String   | Yes      | Customer email                  |
| phone            | String   | No       | Phone number                    |
| company          | String   | No       | Company/business type           |
| requirement      | String   | Yes      | Customer requirement            |
| budget           | String   | No       | Expected budget                 |
| expectedTimeline | String   | No       | Expected completion time        |
| status           | String   | No       | `new`, `contacted`, `qualified` |
| assignedTo       | ObjectId | No       | Reference to User               |
| createdBy        | ObjectId | Yes      | Reference to User               |
| createdAt        | Date     | Auto     | Creation time                   |
| updatedAt        | Date     | Auto     | Last update time                |

## Contact

| Field     | Type     | Required | Description        |
| --------- | -------- | -------- | ------------------ |
| user      | ObjectId | Yes      | Reference to User  |
| name      | String   | Yes      | Customer name      |
| email     | String   | Yes      | Customer email     |
| message   | String   | Yes      | Customer message   |
| reply     | String   | No       | Admin reply        |
| status    | String   | No       | `new` or `replied` |
| createdAt | Date     | Auto     | Creation time      |
| updatedAt | Date     | Auto     | Last update time   |

## WebsiteContent

| Field                | Type   | Description            |
| -------------------- | ------ | ---------------------- |
| home.title           | String | Homepage title         |
| home.description     | String | Homepage description   |
| about.title          | String | About page title       |
| about.description    | String | About page description |
| features             | Array  | Website features       |
| features.title       | String | Feature title          |
| features.description | String | Feature description    |
| createdAt            | Date   | Auto                   |
| updatedAt            | Date   | Auto                   |

## Relationships

- `Lead.createdBy` → `User`
- `Lead.assignedTo` → `User`
- `Contact.user` → `User`

All relationships use MongoDB `ObjectId` references.
