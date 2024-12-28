export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      _AllergyTreatment: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [
          {
            foreignKeyName: '_AllergyTreatment_A_fkey';
            columns: ['A'];
            isOneToOne: false;
            referencedRelation: 'Allergy';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '_AllergyTreatment_B_fkey';
            columns: ['B'];
            isOneToOne: false;
            referencedRelation: 'Treatment';
            referencedColumns: ['id'];
          },
        ];
      };
      _DiseaseTreatment: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [
          {
            foreignKeyName: '_DiseaseTreatment_A_fkey';
            columns: ['A'];
            isOneToOne: false;
            referencedRelation: 'ChronicDisease';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '_DiseaseTreatment_B_fkey';
            columns: ['B'];
            isOneToOne: false;
            referencedRelation: 'Treatment';
            referencedColumns: ['id'];
          },
        ];
      };
      _DoctorHospital: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [
          {
            foreignKeyName: '_DoctorHospital_A_fkey';
            columns: ['A'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '_DoctorHospital_B_fkey';
            columns: ['B'];
            isOneToOne: false;
            referencedRelation: 'Hospital';
            referencedColumns: ['id'];
          },
        ];
      };
      account: {
        Row: {
          accessToken: string | null;
          accessTokenExpiresAt: string | null;
          accountId: string;
          createdAt: string;
          expiresAt: string | null;
          id: string;
          idToken: string | null;
          password: string | null;
          providerId: string;
          refreshToken: string | null;
          refreshTokenExpiresAt: string | null;
          scope: string | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId: string;
          createdAt: string;
          expiresAt?: string | null;
          id: string;
          idToken?: string | null;
          password?: string | null;
          providerId: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId?: string;
          createdAt?: string;
          expiresAt?: string | null;
          id?: string;
          idToken?: string | null;
          password?: string | null;
          providerId?: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'account_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      Allergy: {
        Row: {
          description: string;
          diagnosticDate: string;
          id: string;
          name: string;
          patientId: string;
          reaction: string;
          severity: Database['public']['Enums']['AllergySeverity'];
        };
        Insert: {
          description: string;
          diagnosticDate: string;
          id: string;
          name: string;
          patientId: string;
          reaction: string;
          severity: Database['public']['Enums']['AllergySeverity'];
        };
        Update: {
          description?: string;
          diagnosticDate?: string;
          id?: string;
          name?: string;
          patientId?: string;
          reaction?: string;
          severity?: Database['public']['Enums']['AllergySeverity'];
        };
        Relationships: [
          {
            foreignKeyName: 'Allergy_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Appointment: {
        Row: {
          createdAt: string;
          date: string;
          day: string;
          doctorId: string;
          hour: string;
          id: string;
          motive: string;
          patientId: string;
          priceId: string;
          specialtyId: string;
          status: Database['public']['Enums']['AppointmentStatus'];
          typeId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          date: string;
          day: string;
          doctorId: string;
          hour: string;
          id: string;
          motive: string;
          patientId: string;
          priceId?: string;
          specialtyId: string;
          status: Database['public']['Enums']['AppointmentStatus'];
          typeId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          date?: string;
          day?: string;
          doctorId?: string;
          hour?: string;
          id?: string;
          motive?: string;
          patientId?: string;
          priceId?: string;
          specialtyId?: string;
          status?: Database['public']['Enums']['AppointmentStatus'];
          typeId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Appointment_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Appointment_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Appointment_priceId_fkey';
            columns: ['priceId'];
            isOneToOne: false;
            referencedRelation: 'Price';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Appointment_specialtyId_fkey';
            columns: ['specialtyId'];
            isOneToOne: false;
            referencedRelation: 'Specialty';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Appointment_typeId_fkey';
            columns: ['typeId'];
            isOneToOne: false;
            referencedRelation: 'AppointmentType';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentNote: {
        Row: {
          appointmentId: string;
          date: string;
          description: string;
          id: string;
        };
        Insert: {
          appointmentId: string;
          date: string;
          description: string;
          id: string;
        };
        Update: {
          appointmentId?: string;
          date?: string;
          description?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'AppointmentNote_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentRating: {
        Row: {
          appointmentId: string;
          comment: string | null;
          id: string;
          rating: number;
        };
        Insert: {
          appointmentId: string;
          comment?: string | null;
          id: string;
          rating: number;
        };
        Update: {
          appointmentId?: string;
          comment?: string | null;
          id?: string;
          rating?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'AppointmentRating_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentRecipe: {
        Row: {
          appointmentId: string;
          date: string;
          description: string;
          id: string;
        };
        Insert: {
          appointmentId: string;
          date: string;
          description: string;
          id: string;
        };
        Update: {
          appointmentId?: string;
          date?: string;
          description?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'AppointmentRecipe_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentRoom: {
        Row: {
          appointmentId: string;
          id: string;
          token: string;
          url: string;
        };
        Insert: {
          appointmentId: string;
          id: string;
          token: string;
          url: string;
        };
        Update: {
          appointmentId?: string;
          id?: string;
          token?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'AppointmentRoom_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentTelemetry: {
        Row: {
          appointmentId: string;
          bloodPressure: number | null;
          heartRate: number | null;
          id: string;
          imc: number | null;
          temperature: number | null;
          weight: number | null;
        };
        Insert: {
          appointmentId: string;
          bloodPressure?: number | null;
          heartRate?: number | null;
          id: string;
          imc?: number | null;
          temperature?: number | null;
          weight?: number | null;
        };
        Update: {
          appointmentId?: string;
          bloodPressure?: number | null;
          heartRate?: number | null;
          id?: string;
          imc?: number | null;
          temperature?: number | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'AppointmentTelemetry_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
        ];
      };
      AppointmentType: {
        Row: {
          color: string;
          createdAt: string;
          id: string;
          name: string;
          updatedAt: string;
        };
        Insert: {
          color?: string;
          createdAt?: string;
          id: string;
          name: string;
          updatedAt: string;
        };
        Update: {
          color?: string;
          createdAt?: string;
          id?: string;
          name?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      ChronicDisease: {
        Row: {
          actualState: string;
          description: string;
          diagnosticDate: string;
          id: string;
          patientId: string;
          type: Database['public']['Enums']['ChronicDiseaseType'];
        };
        Insert: {
          actualState: string;
          description: string;
          diagnosticDate: string;
          id: string;
          patientId: string;
          type: Database['public']['Enums']['ChronicDiseaseType'];
        };
        Update: {
          actualState?: string;
          description?: string;
          diagnosticDate?: string;
          id?: string;
          patientId?: string;
          type?: Database['public']['Enums']['ChronicDiseaseType'];
        };
        Relationships: [
          {
            foreignKeyName: 'ChronicDisease_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      ConsultingRoomAddress: {
        Row: {
          address: string;
          city: string;
          doctorId: string;
          id: string;
          roomCoordinates: Json;
        };
        Insert: {
          address: string;
          city: string;
          doctorId: string;
          id: string;
          roomCoordinates: Json;
        };
        Update: {
          address?: string;
          city?: string;
          doctorId?: string;
          id?: string;
          roomCoordinates?: Json;
        };
        Relationships: [
          {
            foreignKeyName: 'ConsultingRoomAddress_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
        ];
      };
      Diagnostic: {
        Row: {
          appointmentId: string;
          code: string;
          createdAt: string;
          description: string;
          doctorId: string;
          id: string;
          patientId: string;
          status: Database['public']['Enums']['DiagnosticStatus'];
          type: Database['public']['Enums']['DiagnosticType'];
          updatedAt: string;
        };
        Insert: {
          appointmentId: string;
          code: string;
          createdAt?: string;
          description: string;
          doctorId: string;
          id: string;
          patientId: string;
          status: Database['public']['Enums']['DiagnosticStatus'];
          type: Database['public']['Enums']['DiagnosticType'];
          updatedAt: string;
        };
        Update: {
          appointmentId?: string;
          code?: string;
          createdAt?: string;
          description?: string;
          doctorId?: string;
          id?: string;
          patientId?: string;
          status?: Database['public']['Enums']['DiagnosticStatus'];
          type?: Database['public']['Enums']['DiagnosticType'];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Diagnostic_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Diagnostic_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Diagnostic_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Doctor: {
        Row: {
          createdAt: string;
          experience: number;
          id: string;
          licenseMedicalNumber: string | null;
          score: number;
          specialtyId: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          experience?: number;
          id: string;
          licenseMedicalNumber?: string | null;
          score?: number;
          specialtyId: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          experience?: number;
          id?: string;
          licenseMedicalNumber?: string | null;
          score?: number;
          specialtyId?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Doctor_specialtyId_fkey';
            columns: ['specialtyId'];
            isOneToOne: false;
            referencedRelation: 'Specialty';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Doctor_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      Education: {
        Row: {
          doctorId: string;
          graduatedAt: string;
          id: string;
          institution: string;
          title: string;
        };
        Insert: {
          doctorId: string;
          graduatedAt: string;
          id: string;
          institution: string;
          title: string;
        };
        Update: {
          doctorId?: string;
          graduatedAt?: string;
          id?: string;
          institution?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Education_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
        ];
      };
      Hospital: {
        Row: {
          adminId: string;
          createdAt: string;
          id: string;
          name: string;
          updatedAt: string;
        };
        Insert: {
          adminId: string;
          createdAt?: string;
          id: string;
          name: string;
          updatedAt: string;
        };
        Update: {
          adminId?: string;
          createdAt?: string;
          id?: string;
          name?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Hospital_adminId_fkey';
            columns: ['adminId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      HospitalAddress: {
        Row: {
          city: string;
          coordinates: Json;
          country: string;
          hospitalId: string;
          id: string;
          street: string;
          zipCode: string;
        };
        Insert: {
          city: string;
          coordinates: Json;
          country: string;
          hospitalId: string;
          id: string;
          street: string;
          zipCode: string;
        };
        Update: {
          city?: string;
          coordinates?: Json;
          country?: string;
          hospitalId?: string;
          id?: string;
          street?: string;
          zipCode?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'HospitalAddress_hospitalId_fkey';
            columns: ['hospitalId'];
            isOneToOne: false;
            referencedRelation: 'Hospital';
            referencedColumns: ['id'];
          },
        ];
      };
      MedicalDocument: {
        Row: {
          createdAt: string;
          description: string;
          documentType: Database['public']['Enums']['DocumentType'];
          fileName: string;
          id: string;
          patientId: string;
          updatedAt: string;
          url: string;
        };
        Insert: {
          createdAt?: string;
          description: string;
          documentType: Database['public']['Enums']['DocumentType'];
          fileName: string;
          id: string;
          patientId: string;
          updatedAt: string;
          url: string;
        };
        Update: {
          createdAt?: string;
          description?: string;
          documentType?: Database['public']['Enums']['DocumentType'];
          fileName?: string;
          id?: string;
          patientId?: string;
          updatedAt?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'MedicalDocument_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      MedicalReference: {
        Row: {
          id: string;
          observations: string | null;
          reason: string;
          recipeId: string;
          referencedId: string;
        };
        Insert: {
          id: string;
          observations?: string | null;
          reason: string;
          recipeId: string;
          referencedId: string;
        };
        Update: {
          id?: string;
          observations?: string | null;
          reason?: string;
          recipeId?: string;
          referencedId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'MedicalReference_recipeId_fkey';
            columns: ['recipeId'];
            isOneToOne: false;
            referencedRelation: 'AppointmentRecipe';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'MedicalReference_referencedId_fkey';
            columns: ['referencedId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
        ];
      };
      MedicalTest: {
        Row: {
          attributes: Json;
          createdAt: string;
          date: string;
          doctorId: string;
          id: string;
          laboratory: string;
          patientId: string;
          recipeId: string;
          type: Database['public']['Enums']['MedicalTestType'];
          updatedAt: string;
        };
        Insert: {
          attributes: Json;
          createdAt?: string;
          date: string;
          doctorId: string;
          id: string;
          laboratory: string;
          patientId: string;
          recipeId: string;
          type: Database['public']['Enums']['MedicalTestType'];
          updatedAt: string;
        };
        Update: {
          attributes?: Json;
          createdAt?: string;
          date?: string;
          doctorId?: string;
          id?: string;
          laboratory?: string;
          patientId?: string;
          recipeId?: string;
          type?: Database['public']['Enums']['MedicalTestType'];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'MedicalTest_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'MedicalTest_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'MedicalTest_recipeId_fkey';
            columns: ['recipeId'];
            isOneToOne: false;
            referencedRelation: 'AppointmentRecipe';
            referencedColumns: ['id'];
          },
        ];
      };
      Medication: {
        Row: {
          description: string;
          dose: string;
          duration: string;
          frequency: string;
          id: string;
          name: string;
          treatmentId: string;
        };
        Insert: {
          description: string;
          dose: string;
          duration: string;
          frequency: string;
          id: string;
          name: string;
          treatmentId: string;
        };
        Update: {
          description?: string;
          dose?: string;
          duration?: string;
          frequency?: string;
          id?: string;
          name?: string;
          treatmentId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Medication_treatmentId_fkey';
            columns: ['treatmentId'];
            isOneToOne: false;
            referencedRelation: 'Treatment';
            referencedColumns: ['id'];
          },
        ];
      };
      Message: {
        Row: {
          appointmentId: string;
          createdAt: string;
          id: string;
          text: string;
          userId: string;
        };
        Insert: {
          appointmentId: string;
          createdAt?: string;
          id: string;
          text: string;
          userId: string;
        };
        Update: {
          appointmentId?: string;
          createdAt?: string;
          id?: string;
          text?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Message_appointmentId_fkey';
            columns: ['appointmentId'];
            isOneToOne: false;
            referencedRelation: 'Appointment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Message_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      Patient: {
        Row: {
          biometric: Json;
          createdAt: string;
          demographic: Json;
          id: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          biometric: Json;
          createdAt?: string;
          demographic: Json;
          id: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          biometric?: Json;
          createdAt?: string;
          demographic?: Json;
          id?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Patient_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      PatientContact: {
        Row: {
          id: string;
          name: string;
          patientId: string;
          phone: string;
          relationship: string;
        };
        Insert: {
          id: string;
          name: string;
          patientId: string;
          phone: string;
          relationship: string;
        };
        Update: {
          id?: string;
          name?: string;
          patientId?: string;
          phone?: string;
          relationship?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'PatientContact_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Price: {
        Row: {
          amount: number;
          currency: string;
          doctorId: string;
          duration: number;
          id: string;
          name: string;
          typeId: string;
        };
        Insert: {
          amount: number;
          currency: string;
          doctorId: string;
          duration: number;
          id: string;
          name?: string;
          typeId: string;
        };
        Update: {
          amount?: number;
          currency?: string;
          doctorId?: string;
          duration?: number;
          id?: string;
          name?: string;
          typeId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Price_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Price_typeId_fkey';
            columns: ['typeId'];
            isOneToOne: false;
            referencedRelation: 'AppointmentType';
            referencedColumns: ['id'];
          },
        ];
      };
      Rating: {
        Row: {
          comment: string | null;
          createdAt: string;
          doctorId: string;
          id: string;
          patientId: string;
          score: number;
          updatedAt: string;
        };
        Insert: {
          comment?: string | null;
          createdAt?: string;
          doctorId: string;
          id: string;
          patientId: string;
          score: number;
          updatedAt: string;
        };
        Update: {
          comment?: string | null;
          createdAt?: string;
          doctorId?: string;
          id?: string;
          patientId?: string;
          score?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Rating_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Rating_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Schedule: {
        Row: {
          appointmentDuration: number;
          days: Json[] | null;
          doctorId: string;
          id: string;
          maxAppointmentsPerDay: number;
        };
        Insert: {
          appointmentDuration: number;
          days?: Json[] | null;
          doctorId: string;
          id: string;
          maxAppointmentsPerDay: number;
        };
        Update: {
          appointmentDuration?: number;
          days?: Json[] | null;
          doctorId?: string;
          id?: string;
          maxAppointmentsPerDay?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Schedule_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
        ];
      };
      SearchDay: {
        Row: {
          day: string;
          hours: number;
          id: string;
          searchDoctorId: string;
        };
        Insert: {
          day: string;
          hours: number;
          id: string;
          searchDoctorId: string;
        };
        Update: {
          day?: string;
          hours?: number;
          id?: string;
          searchDoctorId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'SearchDay_searchDoctorId_fkey';
            columns: ['searchDoctorId'];
            isOneToOne: false;
            referencedRelation: 'SearchDoctor';
            referencedColumns: ['id'];
          },
        ];
      };
      SearchDoctor: {
        Row: {
          doctorId: string;
          experience: number;
          id: string;
          name: string;
          score: number;
          specialty: string;
          userId: string;
        };
        Insert: {
          doctorId: string;
          experience: number;
          id: string;
          name: string;
          score: number;
          specialty: string;
          userId: string;
        };
        Update: {
          doctorId?: string;
          experience?: number;
          id?: string;
          name?: string;
          score?: number;
          specialty?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'SearchDoctor_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
        ];
      };
      SearchSchedule: {
        Row: {
          appointments: number;
          availabilities: number;
          day: string;
          id: string;
          searchDoctorId: string;
        };
        Insert: {
          appointments: number;
          availabilities: number;
          day: string;
          id: string;
          searchDoctorId: string;
        };
        Update: {
          appointments?: number;
          availabilities?: number;
          day?: string;
          id?: string;
          searchDoctorId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'SearchSchedule_searchDoctorId_fkey';
            columns: ['searchDoctorId'];
            isOneToOne: false;
            referencedRelation: 'SearchDoctor';
            referencedColumns: ['id'];
          },
        ];
      };
      session: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          ipAddress: string | null;
          token: string;
          updatedAt: string;
          userAgent: string | null;
          userId: string;
        };
        Insert: {
          createdAt: string;
          expiresAt: string;
          id: string;
          ipAddress?: string | null;
          token: string;
          updatedAt: string;
          userAgent?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          ipAddress?: string | null;
          token?: string;
          updatedAt?: string;
          userAgent?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'session_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      Specialty: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Surgery: {
        Row: {
          date: string;
          details: string;
          hospital: string;
          id: string;
          patientId: string;
          surgeon: string;
          type: string;
        };
        Insert: {
          date: string;
          details: string;
          hospital: string;
          id: string;
          patientId: string;
          surgeon: string;
          type: string;
        };
        Update: {
          date?: string;
          details?: string;
          hospital?: string;
          id?: string;
          patientId?: string;
          surgeon?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Surgery_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Treatment: {
        Row: {
          createdAt: string;
          description: string;
          diagnosticId: string;
          doctorId: string;
          endDate: string;
          id: string;
          instructions: string;
          patientId: string;
          recipeId: string;
          startDate: string;
          status: Database['public']['Enums']['TreatmentStatus'];
          type: Database['public']['Enums']['TreatmentType'];
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          description: string;
          diagnosticId: string;
          doctorId: string;
          endDate: string;
          id: string;
          instructions: string;
          patientId: string;
          recipeId: string;
          startDate: string;
          status: Database['public']['Enums']['TreatmentStatus'];
          type: Database['public']['Enums']['TreatmentType'];
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          description?: string;
          diagnosticId?: string;
          doctorId?: string;
          endDate?: string;
          id?: string;
          instructions?: string;
          patientId?: string;
          recipeId?: string;
          startDate?: string;
          status?: Database['public']['Enums']['TreatmentStatus'];
          type?: Database['public']['Enums']['TreatmentType'];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Treatment_diagnosticId_fkey';
            columns: ['diagnosticId'];
            isOneToOne: false;
            referencedRelation: 'Diagnostic';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Treatment_doctorId_fkey';
            columns: ['doctorId'];
            isOneToOne: false;
            referencedRelation: 'Doctor';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Treatment_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Treatment_recipeId_fkey';
            columns: ['recipeId'];
            isOneToOne: false;
            referencedRelation: 'AppointmentRecipe';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          bio: string | null;
          createdAt: string;
          email: string;
          emailVerified: boolean;
          id: string;
          image: string | null;
          name: string;
          role: Database['public']['Enums']['Role'];
          updatedAt: string;
        };
        Insert: {
          bio?: string | null;
          createdAt?: string;
          email: string;
          emailVerified?: boolean;
          id: string;
          image?: string | null;
          name: string;
          role?: Database['public']['Enums']['Role'];
          updatedAt: string;
        };
        Update: {
          bio?: string | null;
          createdAt?: string;
          email?: string;
          emailVerified?: boolean;
          id?: string;
          image?: string | null;
          name?: string;
          role?: Database['public']['Enums']['Role'];
          updatedAt?: string;
        };
        Relationships: [];
      };
      Vaccine: {
        Row: {
          date: string;
          dose: number;
          id: string;
          name: string;
          nextDose: string | null;
          notes: string | null;
          patientId: string;
        };
        Insert: {
          date: string;
          dose: number;
          id: string;
          name: string;
          nextDose?: string | null;
          notes?: string | null;
          patientId: string;
        };
        Update: {
          date?: string;
          dose?: number;
          id?: string;
          name?: string;
          nextDose?: string | null;
          notes?: string | null;
          patientId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Vaccine_patientId_fkey';
            columns: ['patientId'];
            isOneToOne: false;
            referencedRelation: 'Patient';
            referencedColumns: ['id'];
          },
        ];
      };
      Verification: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt: string;
          value: string;
        };
        Insert: {
          createdAt?: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt: string;
          value: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          identifier?: string;
          updatedAt?: string;
          value?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      AllergySeverity: 'MILD' | 'MODERATE' | 'SEVERE';
      AppointmentStatus:
        | 'SCHEDULED'
        | 'RESCHEDULED'
        | 'CONFIRMED'
        | 'LATE'
        | 'CANCELLED'
        | 'WAITING_DOCTOR'
        | 'WAITING_PATIENT'
        | 'STARTED'
        | 'MISSED'
        | 'FINISHED';
      ChronicDiseaseType: 'GENETIC' | 'AMBIENTAL' | 'INFECTIOUS' | 'HABITUAL';
      DiagnosticStatus: 'ACTIVE' | 'INACTIVE';
      DiagnosticType: 'ALLERGY' | 'DISEASE' | 'SYMPTOM' | 'VACCINE';
      DocumentType: 'MEDICAL_RECORD' | 'PRESCRIPTION' | 'LABORATORY_RESULT' | 'IMAGE' | 'RADIOLOGY' | 'OTHER';
      MedicalTestType:
        | 'BLOOD'
        | 'URINE'
        | 'XRAY'
        | 'MRI'
        | 'CT'
        | 'ECG'
        | 'EEG'
        | 'ECHO'
        | 'ENDOSCOPY'
        | 'COLONOSCOPY'
        | 'BIOPSY'
        | 'OTHER';
      Role: 'HOSPITAL' | 'PATIENT' | 'DOCTOR' | 'UNDEFINED';
      TreatmentStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
      TreatmentType: 'MEDICATION' | 'SURGERY' | 'PHYSIOTHERAPY';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
