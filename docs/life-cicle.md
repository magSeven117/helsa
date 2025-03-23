# Diagrama de ciclo de vida

El siguiente diagrama muestra el ciclo de vida de una cita médica en el sistema. El ciclo de vida comienza con la creación de una cita agendada y termina con la finalización de la cita. En el diagrama se muestran los estados por los que puede pasar una cita y las transiciones entre estos estados.

```mermaid
stateDiagram-v2
    [*] --> SCHEDULED: Cita agendada
    SCHEDULED --> CONFIRMED: Doctor confirma la cita
    SCHEDULED --> CANCELLED: Doctor o paciente cancela la cita
    CONFIRMED --> PAYED: Paciente realiza el pago
    CONFIRMED --> CANCELLED: Paciente o Doctor cancela la cita
    PAYED --> READY: Cita lista para comenzar
    PAYED --> CANCELLED: Paciente o Doctor cancela la cita (reembolso)
    READY --> STARTED: Cita comienza
    READY --> MISSED: Paciente no se presenta
    STARTED --> FINISHED: Cita finalizada
    STARTED --> CANCELLED: Cita cancelada durante la consulta
    FINISHED --> [*]: Cita completada
    CANCELLED --> [*]: Cita cancelada
    CANCELLED --> SCHEDULED: Paciente reagenda la cita
    MISSED --> [*]: Cita perdida
    MISSED --> SCHEDULED: Paciente reagenda la cita
```
