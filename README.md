# FlowPay Central

Sistema de distribuição e monitoramento de atendimentos em tempo real, desenvolvido com ASP.NET Core no backend e React no frontend, com comunicação via SignalR.

## Sobre

O FlowPay Central simula uma central de atendimento bancário com três times (Cartões, Empréstimos e Outros). Atendimentos são criados e distribuídos automaticamente para atendentes disponíveis. Quando todos estão ocupados, o atendimento entra em fila e é distribuído assim que um atendente fica livre. Todas as atualizações são refletidas em tempo real para todos os clientes conectados.

## Funcionalidades

- Distribuição automática de atendimentos por time
- Fila de espera por categoria quando não há atendentes disponíveis
- Atendentes com capacidade máxima de 3 atendimentos simultâneos
- Dashboard com painel por time, contadores de status e histórico de atendimentos
- Atualização em tempo real via SignalR
- Reconexão automática com retry em caso de queda

## Tecnologias

**Backend**
- ASP.NET Core
- SignalR
- Swagger

**Frontend**
- React + TypeScript
- Vite
- TanStack Query
- SignalR JS Client
- Tailwind CSS

## Como rodar

**Pré-requisitos:** .NET 8 SDK, Node.js 18+

**Backend**
```bash
cd backend
dotnet run
```

A API sobe em `https://localhost:5254`. O Swagger fica disponível em `/swagger`.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Estrutura

```
├── backend/
│   ├── Controllers/        # AttendancesController, AttendantsController
│   ├── DTOs/               # CreateAttendanceDto, CreateAttendantDto
│   ├── Hubs/               # AttendanceHub (SignalR)
│   ├── Models/             # Attendance, Attendant, Enums
│   ├── Services/           # DistributionService
│   └── Program.cs
└── frontend/
    └── src/
        ├── components/     # TeamPanel, QueuePanel, ActivityPanel, AttendantCard
        ├── hooks/          # useSignalR, useAttendance
        ├── interfaces/     # IAttendance, IAttendant, Enum
        ├── pages/          # Dashboard
        └── services/       # attendanceService, attendantService
```

## Decisões de design

**Distribuição automática:** o `DistributionService` é registrado como Singleton e centraliza toda a lógica de estado — atendentes, atendimentos e filas por time. Ao criar um atendimento, tenta distribuir imediatamente; se não há atendente disponível, enfileira. Ao completar um atendimento, o próximo da fila é distribuído automaticamente.

**SignalR + React Query:** a integração usa SignalR apenas para notificar que o estado mudou (`AttendanceUpdated`), e o React Query busca os dados atualizados via REST. Isso mantém a fonte de verdade no servidor e simplifica o estado no frontend.

**Capacidade por atendente:** cada atendente suporta até 3 atendimentos simultâneos, controlado pela propriedade computada `IsAvailable` no model.