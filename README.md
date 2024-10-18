# MenuMatch

## Overview
This project focuses on building a restaurant review platform tailored for users with specific dietary needs such as vegan, gluten-free, and halal. The platform aims to make it easier for users to find suitable dining options based on their dietary preferences. Users can filter restaurant reviews according to their needs and view curated ratings for specific food categories, ensuring they choose the best dining option.

## Motivation
The idea for this project emerged from the challenges faced by international students and others with dietary restrictions, particularly in Boston. General restaurant reviews often lack specific information about how suitable a restaurant is for particular diets. This platform addresses that gap, offering users a way to filter restaurants and reviews to meet their unique requirements.

### JIRA Link: https://menumatch.atlassian.net/browse/MENUMATCH
## Features
### Essential Features
- **Food Type Selection**: Users can filter restaurants based on dietary preferences such as vegan, gluten-free, and halal.
- **Overall Restaurant Review**: Users can view the overall rating of a restaurant.
- **Curated Reviews Based on User Choices**: Reviews will be tailored to the user's selected dietary preference.
- **User-Submitted Reviews**: Users can submit reviews for specific food types.
- **Mobile & Web Accessibility**: The platform is accessible on both web and mobile devices.
- **User Registration & Profile Management**: Users can sign up, log in, and manage their profile.

### Desirable Features
- **User Nationality Input**: Users can add their nationality to help others with similar taste preferences find relevant reviews.

### Optional Features
- **Food Flavor Descriptions**: Users can describe the flavors of dishes (e.g., sweet, spicy, savory).
- **Food Photo Uploads**: Users can upload photos of the food they ordered.

## Non-functional Requirements
- **Security & Privacy**: Data encryption via HTTPS to ensure user privacy and secure communication.
- **Performance**: The platform can handle up to 10,000 concurrent users, with search results returning within 2-3 seconds.
- **Scalability**: Horizontal and vertical scaling for future growth.
- **Availability**: Minimum 99.9% uptime with proper notifications for scheduled maintenance.
- **Usability**: Intuitive and responsive design for both web and mobile versions.
- **Compliance**: Adherence to GDPR for users in the European Union.

## Technology Stack
- **Frontend**: Angular
- **Backend**: Flask
- **Database**: MongoDB / MySQL (TBD)
- **Version Control**: Git/GitHub
- **CI/CD**: Jenkins
- **Hosting**: AWS (EC2)
- **Containerization**: Docker
- **Task Management**: JIRA

## Installation & Setup
### Prerequisites
- Python 3.x
- Docker (optional for containerization)
- TODO: Add further Prerequisites as decided

### TODO: Add steps to setup the project


### Branching Strategy
We follow the **GitHub Flow** strategy:
- Create feature branches from the `main` branch.
- Submit a pull request after peer review and passing tests.
- The main branch is always deployable.

## License
This project is licensed under the MIT License.
