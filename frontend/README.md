# ShiftManager

ShiftManager é uma aplicação web para gerenciar plantões médicos, permitindo que diretores de hospitais organizem turnos, médicos e hospitais de maneira eficiente.

## Funcionalidades

- Gerenciamento de médicos (CRUD)
- Gerenciamento de hospitais (CRUD)
- Gerenciamento de turnos (CRUD)
- Visualização de turnos em um calendário
- Notificações para ações bem-sucedidas e erros

## Tecnologias Utilizadas

- **Frontend**
  - React
  - TypeScript
  - TailwindCSS
  - Axios
  - React Calendar
  - React Router Dom
  - React Icons
  - React Hot Toast

- **Backend**
  - Node.js
  - Express
  - MySQL
  - TypeScript
  - Cors
  - Dotenv

- **Deploy**
  - Vercel

## Estrutura do Projeto

src/
├── App.tsx
├── components/
│ ├── Header.tsx
│ ├── Doctor/
│ │ ├── DoctorList.tsx
│ │ └── DoctorForm.tsx
│ ├── Hospital/
│ │ ├── HospitalList.tsx
│ │ └── HospitalForm.tsx
│ ├── Shift/
│ │ ├── ShiftList.tsx
│ │ └── ShiftForm.tsx
│ └── CalendarPage.tsx
└── pages/
├── DoctorsPage.tsx
├── HospitalsPage.tsx
├── ShiftsPage.tsx
└── HomePage.tsx

## Instalação

### Pré-requisitos

- Node.js
- MySQL

