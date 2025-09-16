import { NextRequest, NextResponse } from 'next/server';

const DAILY_API_KEY = process.env.DAILY_API_KEY;
const DAILY_API_URL = 'https://api.daily.co/v1';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const roomName = `appointment-${id}`;
    
    if (!DAILY_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'DAILY_API_KEY no configurada' },
        { status: 500 }
      );
    }

    console.log('🔧 Obteniendo sala:', roomName);

    // Intentar obtener la sala existente
    let roomExists = false;
    try {
      const roomResponse = await fetch(`${DAILY_API_URL}/rooms/${roomName}`, {
        headers: {
          'Authorization': `Bearer ${DAILY_API_KEY}`,
        },
      });
      
      if (roomResponse.ok) {
        roomExists = true;
        console.log('✅ Sala existente encontrada:', roomName);
      }
    } catch (error) {
      console.log('⚠️ Sala no existe, creándola...');
    }

    // Si la sala no existe, crearla
    let roomData = null;
    if (!roomExists) {
      const roomResponse = await fetch(`${DAILY_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DAILY_API_KEY}`,
        },
        body: JSON.stringify({
          name: roomName,
          privacy: 'private',
          properties: {
            exp: Math.round(Date.now() / 1000) + (60 * 60 * 24), // Expira en 24 horas
            enable_chat: true,
            enable_recording: 'cloud',
          },
        }),
      });

      if (!roomResponse.ok) {
        const errorData = await roomResponse.json();
        console.error('❌ Error de Daily.co al crear sala:', errorData);
        return NextResponse.json(
          { success: false, error: 'Error al crear la sala' },
          { status: roomResponse.status }
        );
      }

      roomData = await roomResponse.json();
      console.log('✅ Sala creada exitosamente:', roomData.name);
    } else {
      // Si la sala existe, obtener sus datos
      const roomResponse = await fetch(`${DAILY_API_URL}/rooms/${roomName}`, {
        headers: {
          'Authorization': `Bearer ${DAILY_API_KEY}`,
        },
      });
      
      if (roomResponse.ok) {
        roomData = await roomResponse.json();
        console.log('✅ Datos de sala obtenidos:', roomData.name);
      }
    }

    // Crear token con permisos de transcripción (estructura exacta de mdc_app)
    const tokenResponse = await fetch(`${DAILY_API_URL}/meeting-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_name: `user-${id}`,
          exp: Math.round(Date.now() / 1000) + (60 * 60 * 24), // 24 horas
          is_owner: true,
          auto_start_transcription: false,
          permissions: {
            canAdmin: ['transcription'],
            canSend: ['video', 'audio', 'screenVideo', 'screenAudio'],
          },
        },
      }),
    });

    let tokenData = null;
    if (tokenResponse.ok) {
      tokenData = await tokenResponse.json();
      console.log('✅ Token creado con permisos de transcripción');
    } else {
      const tokenError = await tokenResponse.json();
      console.error('❌ Error creando token:', tokenError);
      return NextResponse.json(
        { success: false, error: 'Error al crear el token' },
        { status: tokenResponse.status }
      );
    }

    // Usar la URL que devuelve Daily.co (como en mdc_app)
    const roomUrl = roomData?.url;
    
    if (!roomUrl) {
      console.error('❌ No se pudo obtener la URL de la sala');
      return NextResponse.json(
        { success: false, error: 'No se pudo obtener la URL de la sala' },
        { status: 500 }
      );
    }

    const responseData = {
      success: true,
      token: tokenData?.token,
      roomUrl: roomUrl,
    };

    console.log('📤 Respuesta final:', {
      success: responseData.success,
      roomName: roomName,
      hasToken: !!responseData.token,
      roomUrl: responseData.roomUrl,
    });

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('💥 Error en la API:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log('🔧 Usuario entrando a la sala:', id);
    
    // Por ahora solo logueamos la entrada, podrías agregar lógica adicional aquí
    return NextResponse.json({ success: true, message: 'Usuario entró a la sala' });
    
  } catch (error) {
    console.error('💥 Error en PUT:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}